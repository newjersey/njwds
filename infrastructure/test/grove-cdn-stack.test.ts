import { describe, it, expect } from "vitest";
import * as cdk from "aws-cdk-lib";
import { Template, Match } from "aws-cdk-lib/assertions";
import { GroveCdnStack } from "../lib/grove-cdn-stack";

// Regression guard for the security properties called out with `// SECURITY:`
// comments in grove-cdn-stack.ts. These tests don't touch AWS - they only
// assert on the synthesized CloudFormation template - so they can't catch
// real-account issues (missing OIDC provider, DNS/Imperva routing, etc).
// Those are verified separately against the live stack.

function synthTemplate(props: Partial<ConstructorParameters<typeof GroveCdnStack>[2]> = {}) {
  const app = new cdk.App();
  const stack = new GroveCdnStack(app, "TestGroveCdnStack", {
    env: { account: "123456789012", region: "us-east-1" },
    githubRepository: "newjersey/njwds",
    ...props,
  });
  return Template.fromStack(stack);
}

describe("GroveCdnStack security properties", () => {
  it("creates a private, encrypted, versioned S3 bucket", () => {
    const template = synthTemplate();

    template.hasResourceProperties("AWS::S3::Bucket", {
      BucketName: "grove-cdn-assets",
      VersioningConfiguration: { Status: "Enabled" },
      BucketEncryption: {
        ServerSideEncryptionConfiguration: Match.arrayWith([
          Match.objectLike({
            ServerSideEncryptionByDefault: Match.objectLike({ SSEAlgorithm: "AES256" }),
          }),
        ]),
      },
      PublicAccessBlockConfiguration: {
        BlockPublicAcls: true,
        BlockPublicPolicy: true,
        IgnorePublicAcls: true,
        RestrictPublicBuckets: true,
      },
    });
  });

  it("restricts the GitHub Actions IAM role to tag-ref releases only", () => {
    const template = synthTemplate();

    template.hasResourceProperties("AWS::IAM::Role", {
      RoleName: "grove-cdn-publisher",
      AssumeRolePolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Effect: "Allow",
            Action: "sts:AssumeRoleWithWebIdentity",
            Condition: Match.objectLike({
              StringEquals: Match.objectLike({
                "token.actions.githubusercontent.com:sub": "repo:newjersey/njwds:ref:refs/tags/*",
              }),
            }),
          }),
        ]),
      }),
    });
  });

  it("explicitly denies destructive S3 and CloudFront actions on the GitHub Actions role", () => {
    const template = synthTemplate();

    template.hasResourceProperties("AWS::IAM::Policy", {
      PolicyDocument: Match.objectLike({
        Statement: Match.arrayWith([
          Match.objectLike({
            Sid: "DenyDestructiveActions",
            Effect: "Deny",
            Action: Match.arrayWith([
              "s3:DeleteBucket",
              "s3:DeleteObject",
              "cloudfront:DeleteDistribution",
              "cloudfront:UpdateDistribution",
            ]),
          }),
        ]),
      }),
    });
  });

  it("enforces HTTPS-only (redirect) on the CloudFront distribution", () => {
    const template = synthTemplate();

    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: Match.objectLike({
        DefaultCacheBehavior: Match.objectLike({
          ViewerProtocolPolicy: "redirect-to-https",
        }),
      }),
    });
  });

  it("omits the custom domain when none is provided", () => {
    const template = synthTemplate();

    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: Match.objectLike({
        Aliases: Match.absent(),
      }),
    });
  });

  it("attaches the custom domain and certificate, with TLS 1.2+ enforced, when both are provided", () => {
    const template = synthTemplate({
      customDomain: "cdn.grove.nj.gov",
      certificateArn:
        "arn:aws:acm:us-east-1:123456789012:certificate/11111111-1111-1111-1111-111111111111",
    });

    template.hasResourceProperties("AWS::CloudFront::Distribution", {
      DistributionConfig: Match.objectLike({
        Aliases: ["cdn.grove.nj.gov"],
        ViewerCertificate: Match.objectLike({
          AcmCertificateArn:
            "arn:aws:acm:us-east-1:123456789012:certificate/11111111-1111-1111-1111-111111111111",
          MinimumProtocolVersion: "TLSv1.2_2021",
        }),
      }),
    });
  });
});

import * as cdk from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudwatch from "aws-cdk-lib/aws-cloudwatch";
import { Construct } from "constructs";

export interface GroveCdnStackProps extends cdk.StackProps {
  readonly githubRepository: string; // Format: "owner/repo"
  readonly customDomain?: string; // Optional: Custom domain like "cdn.grove.nj.gov"
  readonly certificateArn?: string; // Required if customDomain is provided
  readonly enableLogging?: boolean; // Enable CloudFront access logging (default: true)
}

export class GroveCdnStack extends cdk.Stack {
  public readonly bucket: s3.Bucket;
  public readonly distribution: cloudfront.Distribution;
  public readonly githubActionsRole: iam.Role;

  constructor(scope: Construct, id: string, props: GroveCdnStackProps) {
    super(scope, id, props);

    const enableLogging = props.enableLogging ?? true;

    // S3 Bucket for CDN assets
    this.bucket = new s3.Bucket(this, "GroveCdnBucket", {
      bucketName: "grove-cdn-assets",
      versioned: true,
      encryption: s3.BucketEncryption.S3_MANAGED,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
          exposedHeaders: ["ETag"],
          maxAge: 3600,
        },
      ],
      lifecycleRules: [
        {
          // Delete old versions after 90 days
          noncurrentVersionExpiration: cdk.Duration.days(90),
        },
      ],
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Prevent accidental deletion
    });

    // S3 Bucket for CloudFront access logs (if enabled)
    let logBucket: s3.Bucket | undefined;
    if (enableLogging) {
      logBucket = new s3.Bucket(this, "GroveCdnLogBucket", {
        bucketName: "grove-cdn-logs",
        encryption: s3.BucketEncryption.S3_MANAGED,
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_PREFERRED,
        lifecycleRules: [
          {
            id: "DeleteOldLogs",
            enabled: true,
            expiration: cdk.Duration.days(90),
          },
        ],
        removalPolicy: cdk.RemovalPolicy.RETAIN,
      });
    }

    // CloudFront Origin Access Identity
    const oai = new cloudfront.OriginAccessIdentity(this, "GroveCdnOai", {
      comment: "Grove Design System CDN Origin Access Identity",
    });

    // Grant CloudFront read access to S3
    this.bucket.grantRead(oai);

    // CloudFront Function for security headers
    const securityHeadersFunction = new cloudfront.Function(this, "SecurityHeadersFunction", {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
    var response = event.response;
    var headers = response.headers;

    // Prevent MIME type sniffing
    headers['x-content-type-options'] = { value: 'nosniff' };

    // Enable XSS protection
    headers['x-xss-protection'] = { value: '1; mode=block' };

    // Prevent clickjacking
    headers['x-frame-options'] = { value: 'DENY' };

    // Restrict referrer information
    headers['referrer-policy'] = { value: 'strict-origin-when-cross-origin' };

    // Content Security Policy for static assets
    // Allows styles/scripts/fonts/images from same origin only
    headers['content-security-policy'] = {
        value: "default-src 'none'; style-src 'self' 'unsafe-inline'; script-src 'self'; font-src 'self'; img-src 'self' data:; frame-ancestors 'none'; base-uri 'self'; form-action 'none';"
    };

    // HSTS - Force HTTPS for 1 year
    headers['strict-transport-security'] = {
        value: 'max-age=31536000; includeSubDomains; preload'
    };

    // Permissions Policy (formerly Feature-Policy)
    headers['permissions-policy'] = {
        value: 'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
    };

    return response;
}
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
      comment: "Add security headers to all responses",
    });

    // Certificate for custom domain (if provided)
    let certificate: acm.ICertificate | undefined;
    if (props.certificateArn) {
      certificate = acm.Certificate.fromCertificateArn(
        this,
        "CustomDomainCertificate",
        props.certificateArn,
      );
    }

    // CloudFront Distribution
    const distributionProps: cloudfront.DistributionProps = {
      comment: "Grove Design System CDN",
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessIdentity(this.bucket, {
          originAccessIdentity: oai,
        }),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        compress: true,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        // SECURITY: Add security headers to all responses
        functionAssociations: [
          {
            function: securityHeadersFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_RESPONSE,
          },
        ],
      },
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100, // US, Canada, Europe
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      enableIpv6: true,
      enableLogging: enableLogging,
      logBucket: logBucket,
      logFilePrefix: "cdn-access-logs/",
      logIncludesCookies: false,
      // Add custom domain and certificate if provided
      ...(props.customDomain && certificate
        ? { domainNames: [props.customDomain], certificate }
        : {}),
    };

    this.distribution = new cloudfront.Distribution(
      this,
      "GroveCdnDistribution",
      distributionProps,
    );

    // GitHub Actions OIDC Role
    const githubOidcProvider = iam.OpenIdConnectProvider.fromOpenIdConnectProviderArn(
      this,
      "GithubOidcProvider",
      `arn:aws:iam::${this.account}:oidc-provider/token.actions.githubusercontent.com`,
    );

    // GitHub Actions OIDC Role with restricted trust policy
    // SECURITY: Only allow tag-based releases (not any branch)
    this.githubActionsRole = new iam.Role(this, "GithubActionsRole", {
      roleName: "grove-cdn-publisher",
      assumedBy: new iam.FederatedPrincipal(
        githubOidcProvider.openIdConnectProviderArn,
        {
          StringEquals: {
            "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
            // SECURITY: Restrict to tag refs only (releases), not any branch
            "token.actions.githubusercontent.com:sub": `repo:${props.githubRepository}:ref:refs/tags/*`,
          },
        },
        "sts:AssumeRoleWithWebIdentity",
      ),
      description: "Role for GitHub Actions to publish Grove assets to CDN (tag releases only)",
      maxSessionDuration: cdk.Duration.hours(1),
    });

    // Grant GitHub Actions necessary permissions (least privilege)
    // SECURITY: Enforce encryption on upload, read-only list/get, no delete permissions
    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "S3WriteWithEncryptionOnly",
        effect: iam.Effect.ALLOW,
        actions: ["s3:PutObject", "s3:PutObjectAcl"],
        resources: [`${this.bucket.bucketArn}/*`],
        conditions: {
          StringEquals: {
            "s3:x-amz-server-side-encryption": "AES256",
          },
        },
      }),
    );

    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "S3ReadOnly",
        effect: iam.Effect.ALLOW,
        actions: ["s3:GetObject", "s3:ListBucket"],
        resources: [this.bucket.bucketArn, `${this.bucket.bucketArn}/*`],
      }),
    );

    // CloudFront invalidation + read-only distribution config permissions
    // (GetDistribution is needed by the CDN domain lookup step in publish-release.yml)
    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "CloudFrontInvalidateAndRead",
        effect: iam.Effect.ALLOW,
        actions: [
          "cloudfront:CreateInvalidation",
          "cloudfront:GetInvalidation",
          "cloudfront:GetDistribution",
        ],
        resources: [
          `arn:aws:cloudfront::${this.account}:distribution/${this.distribution.distributionId}`,
        ],
      }),
    );

    // SECURITY: Explicitly deny dangerous actions
    this.githubActionsRole.addToPolicy(
      new iam.PolicyStatement({
        sid: "DenyDestructiveActions",
        effect: iam.Effect.DENY,
        actions: [
          "s3:DeleteBucket",
          "s3:DeleteBucketPolicy",
          "s3:PutBucketPolicy",
          "s3:PutLifecycleConfiguration",
          "s3:DeleteObject",
          "s3:DeleteObjectVersion",
          "cloudfront:DeleteDistribution",
          "cloudfront:UpdateDistribution",
        ],
        resources: ["*"],
      }),
    );

    // CloudWatch alarms for error rates
    const distributionMetricDimensions = {
      DistributionId: this.distribution.distributionId,
      Region: "Global",
    };

    const fourXxErrorRateMetric = new cloudwatch.Metric({
      namespace: "AWS/CloudFront",
      metricName: "4xxErrorRate",
      dimensionsMap: distributionMetricDimensions,
      statistic: "Average",
      period: cdk.Duration.minutes(5),
    });

    const fiveXxErrorRateMetric = new cloudwatch.Metric({
      namespace: "AWS/CloudFront",
      metricName: "5xxErrorRate",
      dimensionsMap: distributionMetricDimensions,
      statistic: "Average",
      period: cdk.Duration.minutes(5),
    });

    new cloudwatch.Alarm(this, "GroveCdn4xxErrorAlarm", {
      alarmName: "grove-cdn-4xx-errors",
      alarmDescription: "Alert on high 4xx error rate",
      metric: fourXxErrorRateMetric,
      threshold: 5,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    });

    new cloudwatch.Alarm(this, "GroveCdn5xxErrorAlarm", {
      alarmName: "grove-cdn-5xx-errors",
      alarmDescription: "Alert on high 5xx error rate",
      metric: fiveXxErrorRateMetric,
      threshold: 1,
      evaluationPeriods: 2,
      comparisonOperator: cloudwatch.ComparisonOperator.GREATER_THAN_THRESHOLD,
    });

    // CloudWatch dashboard for CDN health monitoring
    new cloudwatch.Dashboard(this, "GroveCdnDashboard", {
      dashboardName: "grove-cdn-dashboard",
      widgets: [
        [
          new cloudwatch.GraphWidget({
            title: "CloudFront Requests",
            left: [
              new cloudwatch.Metric({
                namespace: "AWS/CloudFront",
                metricName: "Requests",
                dimensionsMap: distributionMetricDimensions,
                statistic: "Sum",
                period: cdk.Duration.minutes(5),
                label: "Total Requests",
              }),
            ],
          }),
          new cloudwatch.GraphWidget({
            title: "Bytes Downloaded",
            left: [
              new cloudwatch.Metric({
                namespace: "AWS/CloudFront",
                metricName: "BytesDownloaded",
                dimensionsMap: distributionMetricDimensions,
                statistic: "Sum",
                period: cdk.Duration.minutes(5),
              }),
            ],
          }),
        ],
        [
          new cloudwatch.GraphWidget({
            title: "Error Rates",
            left: [fourXxErrorRateMetric, fiveXxErrorRateMetric],
            leftYAxis: { label: "Percent" },
          }),
        ],
      ],
    });

    // CloudFormation Outputs
    new cdk.CfnOutput(this, "BucketName", {
      value: this.bucket.bucketName,
      description: "S3 bucket name for CDN assets",
      exportName: "GroveCdnBucketName",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: this.distribution.distributionId,
      description: "CloudFront distribution ID",
      exportName: "GroveCdnDistributionId",
    });

    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: this.distribution.distributionDomainName,
      description: "CloudFront distribution domain name",
      exportName: "GroveCdnDomain",
    });

    new cdk.CfnOutput(this, "GithubActionsRoleArn", {
      value: this.githubActionsRole.roleArn,
      description: "IAM role ARN for GitHub Actions",
      exportName: "GroveCdnGithubRoleArn",
    });

    new cdk.CfnOutput(this, "CdnBaseUrl", {
      value: `https://${this.distribution.distributionDomainName}`,
      description: "Base CDN URL for Grove assets",
      exportName: "GroveCdnBaseUrl",
    });
  }
}

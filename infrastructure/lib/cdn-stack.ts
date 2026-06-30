import * as cdk from "aws-cdk-lib/core";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as route53targets from "aws-cdk-lib/aws-route53-targets";
import { Construct } from "constructs";

/**
 * CDN Stack for Grove (NJWDS) Assets
 *
 * Provisions:
 * - S3 bucket for versioned asset storage
 * - CloudFront distribution with edge caching
 * - ACM certificate for cdn.grove.nj.gov
 * - Route53 DNS record
 *
 * Architecture:
 * - Versioned paths: /v2.9.1/styles.css (1 year cache)
 * - Latest alias: /latest/styles.css (5 minute cache)
 * - Private S3 bucket accessed via CloudFront OAC
 */
export class GroveCdnStack extends cdk.Stack {
  public readonly bucket: s3.IBucket;
  public readonly distribution: cloudfront.IDistribution;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Look up existing hosted zone for grove.nj.gov
    const hostedZone = route53.HostedZone.fromLookup(this, "GroveHostedZone", {
      domainName: "grove.nj.gov",
    });

    // S3 bucket for storing versioned assets
    this.bucket = new s3.Bucket(this, "AssetBucket", {
      bucketName: "nj-grove-cdn",
      versioned: true, // Protect against accidental deletes
      encryption: s3.BucketEncryption.S3_MANAGED, // AES-256 encryption
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL, // Private - only CloudFront can access
      removalPolicy: cdk.RemovalPolicy.RETAIN, // Don't delete bucket on stack destroy
      autoDeleteObjects: false,

      // Lifecycle rules for old versions (optional - uncomment if desired)
      // lifecycleRules: [
      //   {
      //     id: 'DeleteOldVersions',
      //     noncurrentVersionExpiration: cdk.Duration.days(90),
      //   },
      // ],

      // CORS configuration to allow cross-origin CSS/font loading
      cors: [
        {
          allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.HEAD],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
          maxAge: 3600,
        },
      ],
    });

    // ACM certificate for cdn.grove.nj.gov (must be in us-east-1 for CloudFront)
    const certificate = new acm.Certificate(this, "CdnCertificate", {
      domainName: "cdn.grove.nj.gov",
      validation: acm.CertificateValidation.fromDns(hostedZone),
    });

    // Cache policy for versioned assets (immutable, long cache)
    const versionedCachePolicy = new cloudfront.CachePolicy(this, "VersionedCachePolicy", {
      cachePolicyName: "grove-versioned-assets",
      comment: "Long cache for immutable versioned assets",
      defaultTtl: cdk.Duration.days(365),
      maxTtl: cdk.Duration.days(365),
      minTtl: cdk.Duration.days(365),
      headerBehavior: cloudfront.CacheHeaderBehavior.none(),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    // Cache policy for 'latest' alias (short cache, frequent updates)
    const latestCachePolicy = new cloudfront.CachePolicy(this, "LatestCachePolicy", {
      cachePolicyName: "grove-latest-alias",
      comment: "Short cache for latest version alias",
      defaultTtl: cdk.Duration.minutes(5),
      maxTtl: cdk.Duration.hours(1),
      minTtl: cdk.Duration.seconds(0),
      headerBehavior: cloudfront.CacheHeaderBehavior.none(),
      queryStringBehavior: cloudfront.CacheQueryStringBehavior.none(),
      cookieBehavior: cloudfront.CacheCookieBehavior.none(),
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    });

    // Response headers policy for CORS
    const responseHeadersPolicy = new cloudfront.ResponseHeadersPolicy(this, "CorsHeaders", {
      responseHeadersPolicyName: "grove-cors-policy",
      comment: "CORS headers for cross-origin CSS/font loading",
      corsBehavior: {
        accessControlAllowOrigins: ["*"],
        accessControlAllowHeaders: ["*"],
        accessControlAllowMethods: ["GET", "HEAD", "OPTIONS"],
        accessControlAllowCredentials: false,
        accessControlMaxAge: cdk.Duration.hours(1),
        originOverride: false,
      },
    });

    // CloudFront distribution
    this.distribution = new cloudfront.Distribution(this, "CdnDistribution", {
      comment: "Grove (NJWDS) CDN for versioned assets",
      defaultRootObject: "",
      certificate,
      domainNames: ["cdn.grove.nj.gov"],

      // S3 origin with Origin Access Control (OAC)
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: versionedCachePolicy,
        responseHeadersPolicy,
        compress: true,
      },

      // Additional cache behavior for 'latest' path
      additionalBehaviors: {
        "/latest/*": {
          origin: origins.S3BucketOrigin.withOriginAccessControl(this.bucket),
          viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
          cachePolicy: latestCachePolicy,
          responseHeadersPolicy,
          compress: true,
        },
      },

      // Enable IPv6
      enableIpv6: true,

      // Price class (use PriceClass.PRICE_CLASS_ALL for global, or PRICE_CLASS_100 for US/Europe only)
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,

      // Enable logging (optional - uncomment if you want access logs)
      // enableLogging: true,
      // logBucket: new s3.Bucket(this, 'CdnLogBucket', {
      //   bucketName: 'nj-grove-cdn-logs',
      //   removalPolicy: cdk.RemovalPolicy.RETAIN,
      // }),
    });

    // Route53 CNAME record pointing to CloudFront
    new route53.ARecord(this, "CdnAliasRecord", {
      zone: hostedZone,
      recordName: "cdn",
      target: route53.RecordTarget.fromAlias(
        new route53targets.CloudFrontTarget(this.distribution),
      ),
    });

    // Output values for GitHub Actions
    new cdk.CfnOutput(this, "BucketName", {
      value: this.bucket.bucketName,
      description: "S3 bucket name for asset uploads",
      exportName: "GroveCdnBucketName",
    });

    new cdk.CfnOutput(this, "DistributionId", {
      value: this.distribution.distributionId,
      description: "CloudFront distribution ID for cache invalidation",
      exportName: "GroveCdnDistributionId",
    });

    new cdk.CfnOutput(this, "DistributionDomain", {
      value: this.distribution.distributionDomainName,
      description: "CloudFront distribution domain name",
      exportName: "GroveCdnDistributionDomain",
    });

    new cdk.CfnOutput(this, "CdnUrl", {
      value: "https://cdn.grove.nj.gov",
      description: "CDN base URL",
      exportName: "GroveCdnUrl",
    });
  }
}

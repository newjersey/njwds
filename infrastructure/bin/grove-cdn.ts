#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { GroveCdnStack } from "../lib/grove-cdn-stack";

const app = new cdk.App();

// Custom domain configuration (optional)
// To enable custom domain:
// 1. Request ACM certificate for cdn.grove.nj.gov in us-east-1
// 2. Validate certificate via DNS
// 3. Uncomment and set CERTIFICATE_ARN below
// 4. Add CNAME record in grove.nj.gov DNS: cdn -> CloudFront domain

const CUSTOM_DOMAIN = process.env.CDK_CUSTOM_DOMAIN; // e.g., 'cdn.grove.nj.gov'
const CERTIFICATE_ARN = process.env.CDK_CERTIFICATE_ARN; // ACM cert ARN

new GroveCdnStack(app, "GroveCdnStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1", // CloudFront requires us-east-1
  },
  githubRepository: "newjersey/njwds",
  customDomain: CUSTOM_DOMAIN,
  certificateArn: CERTIFICATE_ARN,
  enableLogging: true, // CloudFront access logs enabled
  description: "Grove Design System CDN Infrastructure",
  tags: {
    Project: "Grove-CDN",
    Environment: "Production",
    ManagedBy: "CDK",
    Account: "Innov-Platform-Prod",
  },
});

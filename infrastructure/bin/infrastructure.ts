#!/usr/bin/env node
import * as cdk from "aws-cdk-lib/core";
import { GroveCdnStack } from "../lib/cdn-stack";

const app = new cdk.App();

/**
 * Grove CDN Stack
 *
 * Must be deployed to us-east-1 for:
 * - ACM certificate (CloudFront requirement)
 * - Route53 hosted zone lookup
 *
 * Uses current AWS CLI credentials/profile.
 */
new GroveCdnStack(app, "GroveCdnStack", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },
  description: "CDN infrastructure for Grove (NJWDS) design system assets",
});

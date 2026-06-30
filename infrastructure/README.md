# Grove CDN Infrastructure

AWS CDK infrastructure for hosting Grove (NJWDS) design system assets on CloudFront CDN.

> **⚠️ Haven't deployed yet?** Don't start here!  
> 👉 **Read [START_HERE](../docs/cdn/START_HERE.md) first** for the complete setup guide.

> **Note:** This directory is only for one-time CDN setup and infrastructure changes. Day-to-day releases automatically deploy to the CDN via GitHub Actions - you don't need to touch this directory for normal releases.

## When to Use This Directory

- ✅ **One-time setup:** Initial CDN infrastructure deployment (follow [START_HERE](../docs/cdn/START_HERE.md))
- ✅ **Infrastructure changes:** Modifying CDK stack (rare - e.g., adding new cache policy)
- ❌ **Regular releases:** Handled automatically by GitHub Actions (don't deploy manually)

## One-Time Setup

```bash
cd infrastructure

# Install dependencies
npm install

# Build TypeScript
npm run build

# Preview changes
npm run cdk diff

# Deploy to AWS (one-time)
npm run cdk deploy
```

**After this initial deployment, GitHub Actions handles all future CDN uploads automatically.**

## Architecture

```
GitHub Actions → S3 (nj-grove-cdn) → CloudFront (cdn.grove.nj.gov) → Users
```

**Resources Created:**
- S3 bucket with versioning and encryption
- CloudFront distribution with custom domain
- ACM certificate (auto-validated via Route53)
- Route53 A record

## Asset URLs

**Versioned (production):**
```
https://cdn.grove.nj.gov/v{VERSION}/css/styles.css
```
Cache: 1 year (immutable)

**Latest (floating):**
```
https://cdn.grove.nj.gov/latest/css/styles.css
```
Cache: 5 minutes (quick updates)

## Documentation

- **[Deployment Guide](../docs/cdn/CDN_DEPLOYMENT_GUIDE.md)** - Complete deployment walkthrough
- **[Setup Summary](../docs/cdn/CDN_SETUP_SUMMARY.md)** - Quick overview and architecture
- **[Quick Reference](../docs/cdn/QUICK_REFERENCE.md)** - Common commands cheatsheet
- **[Manual Deployment](../docs/cdn/MANUAL_DEPLOYMENT.md)** - Emergency deployment from root directory
- **[Workflow](../docs/cdn/WORKFLOW.md)** - Visual workflow diagrams
- **[Security Review](../docs/cdn/SECURITY_REVIEW.md)** - Comprehensive security analysis
- **[Security Summary](../docs/cdn/SECURITY_REVIEW_SUMMARY.md)** - Executive security summary
- **[Naming Conventions](../docs/cdn/NAMING_CONVENTIONS.md)** - Naming decisions
- **[Path Structure](../docs/cdn/PATH_STRUCTURE_UPDATE.md)** - URL structure rationale

## CDK Commands

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run watch` | Watch for changes and compile |
| `npm run test` | Run Jest unit tests |
| `npm run cdk deploy` | Deploy stack to AWS |
| `npm run cdk diff` | Preview changes before deploy |
| `npm run cdk synth` | Generate CloudFormation template |
| `npm run cdk destroy` | Delete the stack (S3 bucket retained) |

## First Time Setup

1. **Bootstrap CDK** (one-time per AWS account/region):
   ```bash
   cdk bootstrap aws://ACCOUNT-ID/us-east-1
   ```

2. **Deploy Stack:**
   ```bash
   npm install
   npm run build
   npm run cdk deploy
   ```

3. **Follow Post-Deployment Steps:**
   - See [Deployment Guide](../docs/cdn/CDN_DEPLOYMENT_GUIDE.md) for GitHub OIDC setup
   - See [Security Review](../docs/cdn/SECURITY_REVIEW.md) for hardening steps

## Stack Outputs

After deployment, note these values (needed for GitHub Actions):

- `BucketName` - S3 bucket name for uploads
- `DistributionId` - CloudFront distribution for invalidation
- `CdnUrl` - Base CDN URL

## Security

**Status:** ✅ Secure - Production Ready

Key security features:
- Private S3 bucket (no public access)
- CloudFront Origin Access Control (OAC)
- HTTPS enforced (redirects HTTP)
- S3 encryption at rest (AES-256)
- S3 versioning enabled
- Proper CORS headers (GET/HEAD/OPTIONS only)

See [Security Review Summary](../docs/cdn/SECURITY_REVIEW_SUMMARY.md) for details.

## Cost Estimate

**Monthly costs (typical usage):**
- S3 storage: ~$0.01 (500KB CSS)
- CloudFront: $0-5 (Free Tier: 1TB transfer, 10M requests)
- Route53: $0.50 (hosted zone, shared cost)
- ACM certificate: Free

**After Free Tier:** $5-20/month depending on traffic

## Troubleshooting

**Certificate validation hanging:**
- Verify Route53 hosted zone for `grove.nj.gov` exists
- DNS validation can take 5-30 minutes

**CloudFront not serving files:**
- Verify files in S3: `aws s3 ls s3://nj-grove-cdn/latest/`
- Check distribution status: `aws cloudfront get-distribution --id DIST_ID`
- Wait for "Deployed" status (~15-20 minutes)

**403 Forbidden errors:**
- Verify OAC permissions (automatic via CDK)
- Check CloudFront origin settings

## Updating Infrastructure

1. Edit `lib/cdn-stack.ts`
2. Compile: `npm run build`
3. Preview: `npm run cdk diff`
4. Apply: `npm run cdk deploy`

## Removing the Stack

```bash
npm run cdk destroy
```

⚠️ **Note:** S3 bucket is retained for safety (`RemovalPolicy.RETAIN`).

To fully delete including bucket:
```bash
aws s3 rm s3://nj-grove-cdn --recursive
aws s3 rb s3://nj-grove-cdn
```

# Grove CDN Infrastructure

CDK app that manages the AWS resources behind Grove's CDN (S3, CloudFront, IAM, CloudWatch). This is a self-contained npm project, separate from the root Grove package — see the root README/CLAUDE.md for why it's kept isolated (different dependency footprint, module system, and toolchain than the Storybook/Vite side of this repo).

## Setup

```bash
npm install
```

CDK CLI commands (`cdk synth`, `cdk diff`, `cdk deploy`, etc.) are run directly via `cdk ...`, not through npm scripts — see [Scripts](#scripts) below for why. They need these environment variables set (CDK reads them in `bin/grove-cdn.ts`):

- `CDK_DEFAULT_ACCOUNT` — the AWS account ID to deploy into
- `CDK_CUSTOM_DOMAIN` (optional) — e.g. `cdn.grove.nj.gov`
- `CDK_CERTIFICATE_ARN` (optional) — ACM certificate ARN, required if `CDK_CUSTOM_DOMAIN` is set

## Scripts

| Script | What it runs | Why it exists |
|---|---|---|
| `npm run test` | `vitest run` | Runs the CDK assertion tests in `test/`. These check the *synthesized CloudFormation template* for the security properties called out with `// SECURITY:` comments in the stack (S3 bucket lockdown, IAM trust policy scoped to tag-ref releases, explicit deny on destructive actions, TLS enforcement) — a regression guard so a future edit to the stack can't silently weaken one of those without a test failing. They run entirely offline (no AWS credentials needed) and are wired into `.github/workflows/pr-checks.yml`'s "Health tests" job. They intentionally **can't** catch real-account issues like a missing OIDC provider or DNS/Imperva routing — those only surface by actually deploying and verifying against live AWS, which these tests are not a substitute for. |

That's the only npm script here. `cdk synth`/`cdk diff`/`cdk deploy`/`cdk destroy` are run directly via `cdk <command> --profile <profile>` — `cdk.json`'s `app` entry point doesn't go through npm scripts at all, so wrapping them in `package.json` would just be a second name for the same command with no added function. Deploys in this project happen either manually (reviewing `cdk diff` output first) or via the `production-cdn` GitHub environment's reviewer gate in CI — not through a `npm run deploy` shortcut.

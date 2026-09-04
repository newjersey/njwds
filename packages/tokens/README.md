# @newjersey/tokens

Design tokens for [Grove](https://grove.nj.gov) (NJWDS), built with [Style Dictionary](https://styledictionary.com/) and published as CSS custom properties, Sass variables, and JSON.

Most projects will get these tokens for free through the `@newjersey/njwds` package rather than installing this one directly. Install `@newjersey/tokens` on its own only if you need the raw token values outside of Grove.

## Installation

```bash
npm install @newjersey/tokens --save
```

## Usage

Each token category is available as a standalone file, and every format also ships a combined file with every token in the system. Right now the only category is `typography`, containing font family, font size, and line height tokens.

### CSS

```css
@import "@newjersey/tokens/css/typography.css";
/* or, for every token in the system: */
@import "@newjersey/tokens/css/tokens.css";
```

Custom properties are declared on both `:root` and `:host`, so they're available in the light DOM and inside any Shadow DOM that adopts the stylesheet directly.

```css
.example {
  font-family: var(--grove-font-family-system);
  font-size: var(--grove-font-size-md);
  line-height: var(--grove-line-height-3);
}
```

### Sass

Sass doesn't resolve npm packages through the `exports` field the way Node does, so a bare `@use "@newjersey/tokens/scss/typography"` won't work. Point your Sass compiler's load paths at the package's `build/scss` directory instead — for example, in Vite:

```js
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: ["node_modules/@newjersey/tokens/build/scss"],
      },
    },
  },
};
```

Then `@use` the file by its partial name (no leading underscore, no extension):

```scss
@use "typography" as tokens;
// or: @use "tokens" as tokens;

.example {
  font-family: tokens.$grove-font-family-system;
  font-size: tokens.$grove-font-size-md;
  line-height: tokens.$grove-line-height-3;
}
```

### JSON

```js
import typography from "@newjersey/tokens/json/typography.json";
// or: import tokens from "@newjersey/tokens/json/tokens.json";

typography["font-size"].md; // "1.13rem"
```

## Development

Token source files live in `tokens/**/*.json`, written in [DTCG](https://design-tokens.github.io/community-group/format/) format (`$value`/`$type`). Which category each token belongs to — and therefore which per-category output files get generated — is defined in `config/outputs.js`; the Style Dictionary build config itself lives in `config/style-dictionary.config.js`.

```bash
npm run tokens:build   # clean and build build/css, build/scss, build/json
npm run tokens:watch   # rebuild on token file changes
npm run tokens:test    # run vitest
```

## Releasing

Tokens are released independently from `@newjersey/njwds`, through their own pair of GitHub Actions workflows. Because the two packages share this monorepo, tokens releases use a `tokens-v` tag prefix (e.g. `tokens-v0.2.0`) to keep them separate from njwds' plain `vX.Y.Z` tags — this is what lets each package's workflow find its own release history without picking up the other's.

1. **Draft the release** — run the [`Draft tokens release`](../../.github/workflows/draft-release-tokens.yml) workflow manually (Actions tab → "Draft tokens release" → "Run workflow"). It takes two inputs:
   - `semver_release_type`: `patch` / `minor` / `major` for a normal release, or `prepatch` / `preminor` / `premajor` / `prerelease` to cut an alpha or beta
   - `preid`: `alpha` or `beta` — only relevant for the `pre*` release types above; ignored otherwise

   This bumps the version in `packages/tokens/package.json`, opens a PR with that version bump, and creates a **draft** GitHub release tagged `tokens-vX.Y.Z` (or `tokens-vX.Y.Z-alpha.N` / `-beta.N` for prereleases).

2. **Merge the version-bump PR**, then review and **publish the draft release** on GitHub. Publishing the release (not merging the PR) is what triggers the actual npm publish.

3. **Publishing happens automatically** via the [`Publish tokens release`](../../.github/workflows/publish-release-tokens.yml) workflow, which fires when a `tokens-v*` release is published. It runs `npm publish --workspace=packages/tokens`, tagged appropriately on npm:
   - Stable releases (`tokens-v0.2.0`) publish to the default `latest` npm dist-tag, so a plain `npm install @newjersey/tokens` picks them up.
   - Prereleases (`tokens-v0.2.0-alpha.0`) publish to the `alpha` or `beta` dist-tag instead — **not** `latest` — so they're only installed by consumers who explicitly ask for them:
     ```bash
     npm install @newjersey/tokens@alpha
     npm install @newjersey/tokens@beta
     ```

njwds' own release workflows (`draft-release.yml` / `publish-release.yml`) are unaffected — each pair only acts on its own tag prefix, so a tokens release won't trigger an njwds npm publish or CDN deploy, and vice versa.

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
  font-family: var(--font-family-system);
  font-size: var(--font-size-md);
  line-height: var(--line-height-3);
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
  font-family: tokens.$font-family-system;
  font-size: tokens.$font-size-md;
  line-height: tokens.$line-height-3;
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

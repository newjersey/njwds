/*
    Design System ESLint Configuration
    Standardized for Web Components & Lit
*/
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";
import { defineConfig, globalIgnores } from "eslint/config";

// Framework Specific Plugins
import lit from "eslint-plugin-lit";
import wc from "eslint-plugin-wc";
import litA11y from "eslint-plugin-lit-a11y";

export default defineConfig([
  globalIgnores([
    "node_modules/",
    "dist/",
    "build/",
    "packages/**/dist/",
    "packages/**/node_modules/",
    "gulpfile.js",
    "*.config.js",
  ]),

  // 2. Base Recommendations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,

  // 3. Web Components & Design System Logic
  {
    files: ["**/*.{js,mjs,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser, // Fixes 'window', 'console', and 'fetch' errors
      },
    },
    plugins: {
      lit,
      wc,
      "lit-a11y": litA11y,
    },
    rules: {
      /* General & TypeScript Settings */
      "no-undef": "off", // TypeScript handles undefined variables natively
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      /* Web Component Best Practices (plugin:wc) */
      "wc/no-constructor-attributes": "error",
      "wc/guard-define-call": "warn",
      "wc/no-closed-shadow-root": "error",

      /* Lit & Accessibility (plugin:lit & plugin:lit-a11y) */
      "lit/no-invalid-html": "error",
      "lit-a11y/alt-text": "error",
      "lit-a11y/anchor-is-valid": "error",
      "lit-a11y/click-events-have-key-events": "warn",
      "lit-a11y/no-autofocus": "warn",
    },
  },

  // 4. Formatting (Always last)
  prettierConfig,
]);

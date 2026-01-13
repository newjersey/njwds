/*
    Owns: correctness, best practices, framework rules.
    Enforces Prettier, but does not replace it
*/
import lit from "eslint-plugin-lit";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      "build/**",
      "packages/**/dist/**",
      "packages/**/node_modules/**",
      "gulpfile.js",
      "*.config.js",
    ],
  },
  {
    files: ["**/*.ts", "**/*.js", "**/*.mjs", "**/*.tsx"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tsParser,
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    plugins: {
      lit,
    },
    rules: {
      /* Let TypeScript handle undefined variables */
      "no-undef": "off",

      /* TypeScript */
      "@typescript-eslint/no-unused-vars": "warn",

      /* Lit */
      "lit/no-invalid-html": "error",
    },
  },

  /* Disable formatting-related ESLint rules */
  prettierConfig,
];

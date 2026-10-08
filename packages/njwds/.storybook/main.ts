import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveUswdsRoot } from "../build-scripts/resolve-uswds-root.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uswdsRoot = resolveUswdsRoot(import.meta.url);
const scssLoadPaths = [path.resolve(__dirname, "../src/sass"), path.join(uswdsRoot, "packages")];

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-vitest",
    // "@storybook/addon-a11y",
    "@storybook/addon-docs",
  ],
  framework: "@storybook/web-components-vite",
  staticDirs: ["../public", "../dist"],

  async viteFinal(config) {
    // Make sure css.preprocessorOptions.scss.quietDeps is applied
    config.css ??= {};
    config.css.preprocessorOptions ??= {};
    config.css.preprocessorOptions.scss = {
      ...(config.css.preprocessorOptions.scss ?? {}),
      quietDeps: true,
      loadPaths: scssLoadPaths,
    };

    // Add aliases from vite.config.ts
    config.resolve ??= {};
    config.resolve.alias ??= {};
    (config.resolve.alias as Record<string, string>)["@"] = path.resolve(__dirname, "../src");

    return config;
  },
};

export default config;

import type { StorybookConfig } from "@storybook/web-components-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Locate @uswds/uswds via Node's node_modules search order rather than a
// fixed relative depth, since npm workspaces hoists it to the repo-root
// node_modules. Uses resolve.paths (not require.resolve("@uswds/uswds/package.json"))
// because @uswds/uswds's "exports" map doesn't expose "./package.json" as a subpath.
const require = createRequire(import.meta.url);
const uswdsSearchPaths = require.resolve.paths("@uswds/uswds") ?? [];
const uswdsRoot = uswdsSearchPaths
  .map((searchPath) => path.join(searchPath, "@uswds/uswds"))
  .find((candidate) => existsSync(candidate));
if (!uswdsRoot) {
  throw new Error("Could not locate @uswds/uswds in any node_modules directory");
}
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

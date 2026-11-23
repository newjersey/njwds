import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveUswdsRoot } from "./build-scripts/resolve-uswds-root.ts";
import { virtualEntryPlugin } from "./build-scripts/vite-plugin-virtual-entry.ts";
import {
  listWebComponentNames,
  webComponentBundleContent,
} from "./build-scripts/web-components.ts";

// Resolve __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const webComponentsDir = path.resolve(__dirname, "src/web-components");

const GROVE_BUNDLE_ENTRY_ID = "virtual:grove-web-components-bundle";

/**
 * Vite configuration for the CDN bundle of every Grove web component
 *
 * Builds dist/web-components/grove.min.js: one classic script (IIFE) that registers
 * every web component, for pages without a bundler (legacy apps, prototypes):
 *   <script src="https://cdn.grove.nj.gov/<version>/web-components/grove.min.js" defer></script>
 *
 * Separate from vite.config.grove.ts because the npm build must keep lit external
 * (consumers' bundlers provide it), while this bundle must include it: a plain
 * <script> can't resolve a bare `import "lit"`. Runs after the npm build and only
 * adds its own files to dist/.
 */
export default defineConfig({
  // public/ holds Storybook-only helpers; the npm build already copies what ships
  publicDir: false,

  build: {
    outDir: "dist",
    emptyOutDir: false,
    sourcemap: true,

    rollupOptions: {
      input: GROVE_BUNDLE_ENTRY_ID,
      output: {
        format: "iife",
        entryFileNames: "web-components/grove.min.js",
      },
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Component stylesheets use relative paths for Grove's own Sass and bare names
        // only for USWDS modules, so the USWDS load path is all they need
        loadPaths: [path.join(resolveUswdsRoot(import.meta.url), "packages")],
      },
    },
  },

  plugins: [
    virtualEntryPlugin("grove-web-components-bundle", GROVE_BUNDLE_ENTRY_ID, () =>
      webComponentBundleContent(listWebComponentNames(webComponentsDir), webComponentsDir),
    ),
  ],
});

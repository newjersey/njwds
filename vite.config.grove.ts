import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import autoprefixer from "autoprefixer";
import csso from "postcss-csso";
import { njwdsAssetsPlugin } from "./build-scripts/vite-plugin-njwds-assets";

// Resolve __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration for Grove CSS build
 *
 * This configuration is used specifically for building the Grove CSS bundle.
 * It is separate from vite.config.ts which is used for Storybook development.
 *
 * Uses standard build mode (not library mode) to ensure proper CSS sourcemap generation.
 *
 * Build flow:
 * 1. Custom plugin copies static assets (buildStart hook)
 * 2. Vite compiles SASS with include paths for USWDS imports
 * 3. PostCSS applies autoprefixer and csso (configured in postcss.config.js)
 * 4. Custom plugin replaces version strings (writeBundle hook)
 * 5. CSS and sourcemap written to dist/css/
 */
export default defineConfig({
  // Custom logger to suppress asset resolution warnings
  customLogger: {
    info: console.info,
    warn: (msg) => {
      // Suppress "didn't resolve at build time" warnings - assets are copied by plugin
      if (msg.includes("didn't resolve at build time")) return;
      console.warn(msg);
    },
    warnOnce: (msg) => {
      // Suppress "didn't resolve at build time" warnings - assets are copied by plugin
      if (msg.includes("didn't resolve at build time")) return;
      console.warn(msg);
    },
    error: console.error,
    clearScreen: () => {},
    hasErrorLogged: () => false,
    hasWarned: false,
  },

  build: {
    // Output to dist/ directory (not dist/css/)
    outDir: "dist",

    // Don't clear output directory - preserve assets copied by plugin
    // Manual cleanup via `rm -rf dist` when needed
    emptyOutDir: false,

    // Generate sourcemaps as separate .map files
    sourcemap: true,

    // Disable CSS code splitting (single output file)
    cssCodeSplit: false,

    // Disable Vite's built-in CSS minification - let PostCSS csso handle it
    // This preserves CSS comments needed for version string replacement
    cssMinify: false,

    // Rollup options for explicit input/output control
    rollupOptions: {
      input: {
        // JS entry that imports SASS (enables CSS extraction with sourcemaps)
        styles: path.resolve(__dirname, "src/sass/styles.entry.js"),
      },
      output: {
        // Suppress JS output (we only want CSS)
        entryFileNames: "js/[name].js",
        chunkFileNames: "js/[name].js",

        // Control asset file naming (CSS files go to css/ subdirectory)
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "css/styles.css";
          }
          // Sourcemaps go alongside their CSS files
          if (assetInfo.name?.endsWith(".css.map")) {
            return "css/styles.css.map";
          }
          // Other assets keep their names
          return "[name][extname]";
        },
      },
    },
  },

  // SASS/SCSS preprocessor configuration
  css: {
    // Enable CSS sourcemaps in development and production
    devSourcemap: true,

    // PostCSS configuration (scoped to this build only, won't affect Storybook)
    postcss: {
      plugins: [autoprefixer({ cascade: false, grid: true }), csso({ forceMediaMerge: false })],
    },

    preprocessorOptions: {
      scss: {
        /**
         * Load paths for SASS imports
         *
         * Allows SASS files to import from:
         * - src/sass/ (local Grove styles)
         * - node_modules/@uswds/uswds/packages/ (USWDS packages)
         *
         * Matches original Gulp includePaths configuration
         * Note: Changed @forward "uswds" to @forward "uswds/index" in styles.scss
         * to avoid Vite's package resolution treating it as an npm package import
         */
        loadPaths: [
          path.resolve(__dirname, "src/sass"),
          path.resolve(__dirname, "node_modules/@uswds/uswds/packages"),
        ],

        /**
         * Silence SASS deprecation warnings from upstream dependencies
         *
         * Matches original Gulp silenceDeprecations configuration
         */
        silenceDeprecations: ["color-functions", "global-builtin", "legacy-js-api", "if-function"],
      },
    },
  },

  // Register custom plugin for asset copying and version replacement
  plugins: [njwdsAssetsPlugin()],
});

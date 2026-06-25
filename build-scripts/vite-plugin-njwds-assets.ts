/**
 * Custom Vite plugin for NJWDS asset management
 *
 * This plugin handles two critical tasks in the NJWDS build pipeline:
 * 1. Copying static assets from USWDS and local sources to dist/
 * 2. Replacing version strings in compiled CSS output
 *
 * The plugin implements two Vite build hooks:
 * - buildStart: Runs before compilation, copies all static assets
 * - generateBundle: Runs after CSS compilation, replaces version strings
 *
 * Asset copying happens first to ensure fonts, images, and JavaScript files
 * are available before any CSS compilation occurs. This matches the original
 * Gulp pipeline behavior where assets were copied in parallel with SASS compilation.
 */

import { cpSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Plugin } from "vite";

// Resolve __dirname in ESM
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Configuration for a single asset copy operation
 */
interface AssetCopyConfig {
  /** Absolute path to source directory */
  from: string;
  /** Absolute path to destination directory */
  to: string;
  /** Human-readable description for logging */
  label: string;
}

/**
 * Creates the NJWDS assets plugin
 *
 * @returns Vite plugin object with buildStart and generateBundle hooks
 */
export function njwdsAssetsPlugin(): Plugin {
  // Resolve paths relative to project root
  const projectRoot = resolve(__dirname, "..");
  const uswdsRoot = resolve(projectRoot, "node_modules/@uswds/uswds");
  const distRoot = resolve(projectRoot, "dist");

  /**
   * Asset copy configurations
   *
   * Order matters: USWDS images are copied first, then custom src/img images
   * overwrite any USWDS images with matching names. This matches Gulp behavior.
   */
  const assetConfigs: AssetCopyConfig[] = [
    {
      from: resolve(uswdsRoot, "dist/fonts"),
      to: resolve(distRoot, "fonts"),
      label: "USWDS fonts",
    },
    {
      from: resolve(uswdsRoot, "dist/img"),
      to: resolve(distRoot, "img"),
      label: "USWDS images",
    },
    {
      from: resolve(projectRoot, "src/img"),
      to: resolve(distRoot, "img"),
      label: "Custom NJ images",
    },
    {
      from: resolve(uswdsRoot, "dist/js"),
      to: resolve(distRoot, "js"),
      label: "USWDS JavaScript",
    },
  ];

  return {
    name: "njwds-assets",

    /**
     * buildStart hook - Copies static assets after Vite cleanup
     *
     * This hook runs at the start of the build, AFTER Vite's emptyOutDir
     * cleanup. We copy all static assets here so they're available during
     * and after the build process.
     *
     * Uses Node.js built-in cpSync with recursive: true for directory copying.
     * This is more reliable than shell commands and works cross-platform.
     */
    buildStart() {
      console.log("\n[njwds-assets] Copying static assets...\n");

      for (const config of assetConfigs) {
        // Validate source exists before attempting copy
        if (!existsSync(config.from)) {
          throw new Error(
            `[njwds-assets] Source path does not exist: ${config.from}\n` +
              `Expected to find ${config.label} but the directory is missing.\n` +
              `This usually means @uswds/uswds is not installed or the package structure has changed.`,
          );
        }

        try {
          // Copy entire directory recursively
          // force: true allows overwriting (needed for custom NJ images)
          cpSync(config.from, config.to, { recursive: true, force: true });
          console.log(`  ✓ Copied ${config.label}: ${config.from} → ${config.to}`);
        } catch (error) {
          throw new Error(
            `[njwds-assets] Failed to copy ${config.label}:\n${error instanceof Error ? error.message : String(error)}`,
          );
        }
      }

      console.log("\n[njwds-assets] Asset copying complete\n");
    },

    /**
     * writeBundle hook - Replaces version string in CSS output
     *
     * This hook runs AFTER the bundle is written to disk, which is necessary
     * because Vite's library mode extracts CSS to a separate file outside the
     * bundle object. We read the CSS file, perform the replacement, and write
     * it back.
     *
     * The USWDS SASS source contains the string "uswds @version" which needs
     * to be replaced with "based on uswds v{actual-version-number}" in the
     * final CSS output. This provides version tracking in the compiled CSS.
     */
    writeBundle() {
      // Read USWDS version from its package.json
      const uswdsPkgPath = resolve(uswdsRoot, "package.json");

      if (!existsSync(uswdsPkgPath)) {
        throw new Error(
          `[njwds-assets] Cannot find USWDS package.json at: ${uswdsPkgPath}\n` +
            `This is required to determine the USWDS version for CSS version string replacement.`,
        );
      }

      let uswdsVersion: string;
      try {
        const uswdsPkg = JSON.parse(readFileSync(uswdsPkgPath, "utf-8"));
        uswdsVersion = uswdsPkg.version;

        if (!uswdsVersion) {
          throw new Error("version field is missing");
        }
      } catch (error) {
        throw new Error(
          `[njwds-assets] Failed to read USWDS version from package.json:\n${error instanceof Error ? error.message : String(error)}`,
        );
      }

      // Find and replace version string in the CSS file
      // In library mode, CSS is extracted to a separate file after generateBundle
      // so we need to read it from disk, modify it, and write it back
      const cssOutputPath = resolve(projectRoot, "dist/css/styles.css");

      if (!existsSync(cssOutputPath)) {
        console.log("[njwds-assets] Warning: styles.css not found, skipping version replacement");
        return;
      }

      try {
        const cssContent = readFileSync(cssOutputPath, "utf-8");

        if (cssContent.includes("uswds @version")) {
          const updatedCss = cssContent.replace(
            /\buswds @version\b/g,
            `based on uswds v${uswdsVersion}`,
          );

          writeFileSync(cssOutputPath, updatedCss, "utf-8");
          console.log(`[njwds-assets] Replaced version string in styles.css`);
        } else {
          console.log("[njwds-assets] Version marker not found in styles.css");
        }
      } catch (error) {
        throw new Error(
          `[njwds-assets] Failed to replace version string:\n${error instanceof Error ? error.message : String(error)}`,
        );
      }
    },
  };
}

/**
 * Smoke tests for njwdsAssetsPlugin
 *
 * These tests validate the plugin structure and interface.
 * Behavioral testing (actual asset copying and version replacement)
 * happens via integration tests in Task 5.
 */

import { describe, test, expect } from "vitest";
import type { Plugin } from "vite";

describe("njwdsAssetsPlugin", () => {
  test("exports njwdsAssetsPlugin function", async () => {
    const module = await import("./vite-plugin-njwds-assets.js");
    expect(module.njwdsAssetsPlugin).toBeDefined();
    expect(typeof module.njwdsAssetsPlugin).toBe("function");
  });

  test("returns plugin object with correct name", async () => {
    const { njwdsAssetsPlugin } = await import("./vite-plugin-njwds-assets.js");
    const plugin = njwdsAssetsPlugin();

    expect(plugin).toBeDefined();
    expect(plugin.name).toBe("njwds-assets");
  });

  test("plugin has buildStart hook", async () => {
    const { njwdsAssetsPlugin } = await import("./vite-plugin-njwds-assets.js");
    const plugin = njwdsAssetsPlugin();

    expect(plugin.buildStart).toBeDefined();
    expect(typeof plugin.buildStart).toBe("function");
  });

  test("plugin has generateBundle hook", async () => {
    const { njwdsAssetsPlugin } = await import("./vite-plugin-njwds-assets.js");
    const plugin = njwdsAssetsPlugin();

    expect(plugin.generateBundle).toBeDefined();
    expect(typeof plugin.generateBundle).toBe("function");
  });

  test("plugin conforms to Vite Plugin type", async () => {
    const { njwdsAssetsPlugin } = await import("./vite-plugin-njwds-assets.js");
    const plugin = njwdsAssetsPlugin();

    // Type assertion to verify it matches Vite's Plugin interface
    const _typeCheck: Plugin = plugin;
    expect(_typeCheck).toBe(plugin);
  });
});

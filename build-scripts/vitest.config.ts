/**
 * Vitest configuration for build-scripts tests
 *
 * Build scripts (Vite plugins, Node.js utilities) need to run in Node.js environment.
 * The root vite.config.ts uses jsdom for web component tests.
 * Vitest automatically discovers this config for tests in build-scripts/ directory.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});

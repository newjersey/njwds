/**
 * Vitest configuration for build-scripts tests
 *
 * Not used by `npm run test` or `npm run test:coverage`: those run from the package
 * root with vite.config.ts, so build-scripts/*.spec.ts run in its `unit` project
 * (jsdom), not in this config's Node environment. Vitest doesn't merge nested configs.
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});

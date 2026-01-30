// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  snapshotDir: "./src/tests/__screenshots__",
  use: {
    viewport: { width: 1280, height: 800 },
  },
});

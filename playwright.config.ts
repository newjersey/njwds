// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  snapshotDir: "./src/tests/__screenshots__",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  use: {
    viewport: { width: 1280, height: 800 },
  },
  projects: [
    {
      name: "visual",
      testMatch: "**/*.visual.spec.ts",
    },
    {
      name: "accessibility",
      testMatch: "**/*.accessibility.spec.ts",
    },
  ],
});

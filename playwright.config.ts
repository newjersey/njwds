// playwright.config.ts
import { defineConfig } from "@playwright/test";
import { DEFAULT_VIEWPORT } from "./src/tests/utils/config";

export default defineConfig({
  testDir: "./src/tests",
  snapshotDir: "./src/tests/__screenshots__",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  use: {
    viewport: DEFAULT_VIEWPORT,
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

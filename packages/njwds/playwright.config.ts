// playwright.config.ts
import { defineConfig } from "@playwright/test";
import { DEFAULT_VIEWPORT, STORYBOOK_URL } from "./src/utils/config";

export default defineConfig({
  testDir: "./src/tests",
  snapshotDir: "./src/tests/__screenshots__",
  snapshotPathTemplate: "{testDir}/__screenshots__/{testFilePath}/{arg}{ext}",
  use: {
    viewport: DEFAULT_VIEWPORT,
  },
  webServer: {
    command: "npx http-server storybook-static -p 6006",
    url: STORYBOOK_URL,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
    stdout: "ignore",
    stderr: "pipe",
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

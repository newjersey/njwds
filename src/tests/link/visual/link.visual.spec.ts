import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";
const PAGE_URL = `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Alight%3Bexternal%3A!true`;

const viewports = [
  { name: "narrow", width: 375, height: 800 },
  { name: "wide", width: 1280, height: 800 },
];

test.describe("Link - visual regression", () => {
  for (const viewport of viewports) {
    test(`renders correctly (${viewport.name})`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Stabilize rendering:
      await page.emulateMedia({ reducedMotion: "reduce" });

      await page.goto(PAGE_URL);
      await page.waitForLoadState("networkidle");

      // Full-page screenshot
      await expect(page).toHaveScreenshot(`link-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01, // allow a 1px difference
      });
    });
  }
});

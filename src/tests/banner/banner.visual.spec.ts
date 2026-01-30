import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const PAGE_URL = `${BASE_URL}/components/preview/banner`;

/**
 * Keep viewport coverage intentional and small.
 */
const viewports = [
  { name: "narrow", width: 393, height: 800 },
  { name: "wide", width: 1280, height: 800 },
];

test.describe("Banner – visual regression", () => {
  for (const viewport of viewports) {
    test(`renders correctly (${viewport.name})`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      /**
       * Stabilize rendering:
       * - Disable animations and transitions
       * - Prevent motion-related flakiness
       */
      await page.emulateMedia({ reducedMotion: "reduce" });

      await page.goto(PAGE_URL);
      await page.waitForLoadState("networkidle");

      /**
       * Full-page screenshot
       */
      await expect(page).toHaveScreenshot(`banner-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01, // allow a 1px difference
      });
    });
  }
});

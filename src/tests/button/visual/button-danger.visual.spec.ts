import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000";
const PAGE_URL = `${BASE_URL}/components/preview/buttons--primary-(danger)`;

const viewports = [
  { name: "narrow", width: 375, height: 800 },
  { name: "wide", width: 1280, height: 800 },
];

test.describe("Button, danger - visual regression", () => {
  for (const viewport of viewports) {
    test(`renders correctly (${viewport.name})`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      // Stabilize rendering:
      await page.emulateMedia({ reducedMotion: "reduce" });

      // Open the page at the URL defined above.
      // Using `networkidle` ensures that all network requests (CSS, fonts, JS) have
      // finished before running the test.
      await page.goto(PAGE_URL);
      await page.waitForLoadState("networkidle");

      // Full-page screenshot
      await expect(page).toHaveScreenshot(`button-danger-${viewport.name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01, // allow a 1px difference
      });
    });
  }
});

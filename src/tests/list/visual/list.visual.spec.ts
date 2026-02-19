import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

const URLS = {
  ordered: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList`,
  unordered: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AUnOrdered%2BList`,
  unstyled: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList%3Bunstyled%3A!true&globals=`,
};

for (const [key, value] of Object.entries(URLS)) {
  if (value) {
    const PAGE_URL = value;
    test.describe("List - visual regression", () => {
      test(`renders correctly (${key})`, async ({ page }) => {
        // Stabilize rendering:
        await page.emulateMedia({ reducedMotion: "reduce" });

        await page.goto(PAGE_URL);
        await page.waitForLoadState("networkidle");

        // Full-page screenshot
        await expect(page).toHaveScreenshot(`link-${key}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.01, // allow a 1px difference
        });
      });
    });
  }
}

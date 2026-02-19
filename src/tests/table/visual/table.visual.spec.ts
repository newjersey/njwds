import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-table--basic&viewMode=story`,
  },
  {
    name: "borderless",
    url: `${BASE_URL}/iframe.html?id=elements-table--basic&viewMode=story&args=border%3A!false`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`Table component - ${name}`, () => {
    test(`renders correctly (${name})`, async ({ page }) => {
      // Stabilize rendering:
      await page.emulateMedia({ reducedMotion: "reduce" });

      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // Full-page screenshot
      await expect(page).toHaveScreenshot(`table-${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01, // allow a 1px difference
      });
    });
  });
}

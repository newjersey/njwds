import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-tag--basic&viewMode=story`,
  },
  {
    name: "Big",
    url: `${BASE_URL}/iframe.html?id=components-tag--basic&viewMode=story&args=size%3Abig`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`Tag - ${name}`, () => {
    test.describe("Tag - visual regression", () => {
      test(`renders correctly (${name})`, async ({ page }) => {
        // Stabilize rendering:
        await page.emulateMedia({ reducedMotion: "reduce" });

        await page.goto(url);
        await page.waitForLoadState("networkidle");

        // Full-page screenshot
        await expect(page).toHaveScreenshot(`tag-${name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.01, // allow a 1px difference
        });
      });
    });
  });
}

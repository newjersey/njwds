import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "ordered",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList`,
  },
  {
    name: "unordered",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AUnordered%2BList`,
  },
  {
    name: "unstyled",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList%3Bstyled%3A!true`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`List component - ${name}`, () => {
    test.describe("List - visual regression", () => {
      test(`renders correctly (${name})`, async ({ page }) => {
        // Stabilize rendering:
        await page.emulateMedia({ reducedMotion: "reduce" });

        await page.goto(url);
        await page.waitForLoadState("networkidle");

        // Full-page screenshot
        await expect(page).toHaveScreenshot(`link-${name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.01, // allow a 1px difference
        });
      });
    });
  });
}

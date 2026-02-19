import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "light",
    url: `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Alight%3Bexternal%3A!true`,
  },
  {
    name: "dark",
    url: `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Adark%3Bexternal%3A!true`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`Link component - ${name}`, () => {
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
}

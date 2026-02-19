import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-alert--basic&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Info",
    url: `${BASE_URL}/iframe.html?id=components-alert--info&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Warning",
    url: `${BASE_URL}/iframe.html?id=components-alert--warning&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Success",
    url: `${BASE_URL}/iframe.html?id=components-alert--success&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Error",
    url: `${BASE_URL}/iframe.html?id=components-alert--error&viewMode=story&args=icon%3A!true`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`Alert - ${name}`, () => {
    test.describe("Alert - visual regression", () => {
      test(`renders correctly (${name})`, async ({ page }) => {
        // Stabilize rendering:
        await page.emulateMedia({ reducedMotion: "reduce" });

        await page.goto(url);
        await page.waitForLoadState("networkidle");

        // Full-page screenshot
        await expect(page).toHaveScreenshot(`alert-${name}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.01, // allow a 1px difference
        });
      });
    });
  });
}

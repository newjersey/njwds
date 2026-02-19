import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story`,
  },
  {
    name: "dark",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "danger",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "secondary - dark",
    url: `${BASE_URL}/iframe.html?id=elements-button--secondary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "secondary - danger",
    url: `${BASE_URL}/iframe.html?id=elements-button--secondary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "secondary",
    url: `${BASE_URL}/iframe.html?id=elements-button--secondary&viewMode=story`,
  },
  {
    name: "tertiary - dark",
    url: `${BASE_URL}/iframe.html?id=elements-button--tertiary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "tertiary - danger",
    url: `${BASE_URL}/iframe.html?id=elements-button--tertiary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "tertiary",
    url: `${BASE_URL}/iframe.html?id=elements-button--tertiary&viewMode=story`,
  },
  {
    name: "icon",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&globals=&args=icon%3A!true`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`Button - ${name}`, () => {
    test(`renders correctly (${name})`, async ({ page }) => {
      // Stabilize rendering:
      await page.emulateMedia({ reducedMotion: "reduce" });

      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // Full-page screenshot
      await expect(page).toHaveScreenshot(`button-${name}.png`, {
        fullPage: true,
        maxDiffPixelRatio: 0.01, // allow a 1px difference
      });
    });
  });
}

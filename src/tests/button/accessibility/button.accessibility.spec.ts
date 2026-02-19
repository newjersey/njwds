import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`Button - ${name}`, () => {
    // Primary axe-core scan for this component.
    test("has no detectable a11y violations", async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // .include(".usa-button") ensures the scan is scoped to the Button itself.
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include(".usa-button")
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
}

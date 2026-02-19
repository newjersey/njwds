import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    test(`should have no detectable a11y violations`, async ({ page }) => {
      // Load the storybook iframe
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // Scope the accessibility scan to the alert component
      const results = await new AxeBuilder({ page }).include(".usa-alert").analyze();

      // Fail if there are violations
      expect(results.violations).toEqual([]);
    });
  });
}

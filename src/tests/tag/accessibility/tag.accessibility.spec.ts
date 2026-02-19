import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    test(`should have no detectable a11y violations`, async ({ page }) => {
      // Load the storybook iframe
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // Scope the accessibility scan to the tag component
      const results = await new AxeBuilder({ page }).include(".usa-tag").analyze();

      // Fail if there are violations
      expect(results.violations).toEqual([]);
    });
  });
}

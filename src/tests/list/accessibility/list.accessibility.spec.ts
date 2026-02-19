import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Ordered List",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList`,
  },
  {
    name: "Unordered List",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AUnordered%2BList`,
  },
  {
    name: "Unstyled Ordered List",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList%3Bstyled%3A!true`,
  },
];

for (const { name, url } of TEST_CASES) {
  test.describe.parallel(`List component - ${name}`, () => {
    test(`should have no detectable a11y violations`, async ({ page }) => {
      // Load the storybook iframe
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // Scope the accessibility scan to the list component
      const results = await new AxeBuilder({ page }).include(".usa-list").analyze();

      // Fail if there are violations
      expect(results.violations).toEqual([]);
    });
  });
}

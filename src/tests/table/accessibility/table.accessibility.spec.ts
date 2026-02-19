import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
  test.describe.parallel(`Table - ${name}`, () => {
    // Primary axe-core scan for this component.
    test("has no detectable a11y violations", async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // .include(".usa-table") ensures the scan is scoped to the Table itself.
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include(".usa-table")
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
}

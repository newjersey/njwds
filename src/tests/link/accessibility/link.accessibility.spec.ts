import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

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
    // Primary axe-core scan for this component.
    test("has no detectable a11y violations", async ({ page }) => {
      await page.goto(url);
      await page.waitForLoadState("networkidle");

      // .include(".usa-link") ensures the scan is scoped to the Link itself.
      const accessibilityScanResults = await new AxeBuilder({ page })
        .include(".usa-link")
        .analyze();

      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
}

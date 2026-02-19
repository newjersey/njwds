import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = "http://localhost:6006";

const URLS = {
  ordered: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList`,
  unordered: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AUnOrdered%2BList`,
  unstyled: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList%3Bunstyled%3A!true&globals=`,
};

for (const [key, value] of Object.entries(URLS)) {
  if (value) {
    const PAGE_URL = value;

    test.describe(`List, ${key} - accessibility`, () => {
      // Primary axe-core scan for this component.
      test("has no detectable a11y violations", async ({ page }) => {
        await page.goto(PAGE_URL);
        await page.waitForLoadState("networkidle");

        // .include(".usa-link") ensures the scan is scoped to the Link itself.
        const accessibilityScanResults = await new AxeBuilder({ page })
          .include(".usa-list")
          .analyze();

        expect(accessibilityScanResults.violations).toEqual([]);
      });
    });
  }
}

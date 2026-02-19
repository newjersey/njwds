import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = "http://localhost:6006";
const PAGE_URL = `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Adark%3Bexternal%3A!true`;

// Group all accessibility tests for the Link component under a single describe block.
test.describe("Link, Dark - accessibility", () => {
  // Primary axe-core scan for this component.
  test("has no detectable a11y violations", async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForLoadState("networkidle");

    // .include(".usa-link") ensures the scan is scoped to the Link itself.
    const accessibilityScanResults = await new AxeBuilder({ page }).include(".usa-link").analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

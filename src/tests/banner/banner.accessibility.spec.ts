import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

// The base URL for your locally served components.
const BASE_URL = "http://localhost:6006";

// The specific page URL for the Banner component preview.
const PAGE_URL = `${BASE_URL}/iframe.html?id=components-banner&viewMode=story`;

// Group all accessibility tests for the Banner component under a single describe block.
test.describe("Banner – accessibility", () => {
  // Primary axe-core scan for this component.
  test("has no detectable a11y violations", async ({ page }) => {
    // Open the page at the URL defined above.
    // Using `networkidle` ensures that all network requests (CSS, fonts, JS) have
    // finished before running the accessibility scan.
    await page.goto(PAGE_URL);
    await page.waitForLoadState("networkidle");

    // .include(".nj-banner") ensures the scan is scoped to the Banner itself.
    const accessibilityScanResults = await new AxeBuilder({ page }).include(".nj-banner").analyze();

    // If axe finds any violations, this test will fail, and Playwright will
    // report detailed information about each issue (impact, rule, affected nodes).
    // The empty array assertion ensures only a clean, violation-free component passes.
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

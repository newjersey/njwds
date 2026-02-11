import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = "http://localhost:6006";
const PAGE_URL = `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&args=theme%3Adanger`;

// Group all accessibility tests for the Button component under a single describe block.
test.describe("Button, danger - accessibility", () => {
  // Primary axe-core scan for this component.
  test("has no detectable a11y violations", async ({ page }) => {
    // Open the page at the URL defined above.
    // Using `networkidle` ensures that all network requests (CSS, fonts, JS) have
    // finished before running the accessibility scan.
    await page.goto(PAGE_URL);
    await page.waitForLoadState("networkidle");

    // .include(".usa-button") ensures the scan is scoped to the Button itself.
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(".usa-button")
      .analyze();

    // If axe finds any violations, this test will fail, and Playwright will
    // report detailed information about each issue (impact, rule, affected nodes).
    // The empty array assertion ensures only a clean, violation-free component passes.
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

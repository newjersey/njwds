import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = "http://localhost:3000";
const PAGE_URL = `${BASE_URL}/components/preview/banner`;

test.describe("Banner – accessibility", () => {
  test("has no detectable a11y violations", async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page }).include(".nj-banner").analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

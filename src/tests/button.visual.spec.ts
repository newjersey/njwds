import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE_URL = "http://localhost:3000";
const PAGE_URL = `${BASE_URL}/components/preview/buttons--primary-(light)`;

/**
 * Keep viewport coverage intentional and small.
 */
const viewports = [
  { name: "narrow", width: 375, height: 800 },
  { name: "wide", width: 1280, height: 800 },
];

test.describe("Button – visual regression", () => {
  for (const viewport of viewports) {
    test(`renders correctly (${viewport.name})`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });

      /**
       * Stabilize rendering:
       * - Disable animations and transitions
       * - Prevent motion-related flakiness
       */
      await page.emulateMedia({ reducedMotion: "reduce" });

      await page.goto(PAGE_URL);
      await page.waitForLoadState("networkidle");

      /**
       * Full-page screenshot
       */
      await expect(page).toHaveScreenshot(`button-${viewport.name}.png`, { fullPage: true });
    });
  }
});

test.describe("Button – accessibility", () => {
  test("has no detectable a11y violations", async ({ page }) => {
    await page.goto(PAGE_URL);
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .include(".usa-button")
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});

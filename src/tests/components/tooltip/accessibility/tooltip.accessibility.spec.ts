import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { STORYBOOK_URL } from "../../../../utils/config";

const STORY_URL = `/iframe.html?id=components-tooltip--default&viewMode=story`;

test.describe("Tooltip", () => {
  test.describe.parallel("Default", () => {
    const tooltipPositions = [
      { position: "left", buttonText: "Show on left" },
      { position: "top", buttonText: "Show on top" },
      { position: "bottom", buttonText: "Show on bottom" },
      { position: "right", buttonText: "Show on right" },
    ];

    for (const { position, buttonText } of tooltipPositions) {
      test(`has no detectable a11y violations (${position})`, async ({ page }) => {
        await page.goto(`${STORYBOOK_URL}${STORY_URL}`);
        await page.waitForLoadState("networkidle");

        // Find the button for this tooltip position
        const button = page.getByRole("button", { name: buttonText });

        // Focus on the button to show the tooltip
        await button.focus();

        // Wait for any tooltip body to become visible
        await page.waitForSelector(".usa-tooltip__body[aria-hidden='false']", {
          state: "visible",
          timeout: 5000,
        });

        // Run accessibility analysis with the tooltip visible
        // Scope to #root-inner to avoid Storybook chrome violations
        const results = await new AxeBuilder({ page }).include("#root-inner").analyze();

        expect(results.violations).toEqual([]);
      });
    }
  });
});

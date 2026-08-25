import { test, expect } from "@playwright/test";
import { STORYBOOK_URL, DEFAULT_VIEWPORT } from "../../../../utils/config";

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
      test(`renders correctly (${position})`, async ({ page }) => {
        // Stabilize rendering
        await page.emulateMedia({ reducedMotion: "reduce" });

        // Apply viewport
        await page.setViewportSize({
          width: DEFAULT_VIEWPORT.width,
          height: DEFAULT_VIEWPORT.height,
        });

        await page.goto(`${STORYBOOK_URL}${STORY_URL}`);
        await page.waitForLoadState("networkidle");

        // Find the button for this tooltip position
        const button = page.getByRole("button", { name: buttonText });

        // Focus over the button to show the tooltip
        await button.focus();

        // Wait for any tooltip body to become visible
        await page.waitForSelector(".usa-tooltip__body[aria-hidden='false']", {
          state: "visible",
          timeout: 5000,
        });

        await expect(page).toHaveScreenshot(`Tooltip-Default-${position}.png`, {
          fullPage: true,
          maxDiffPixelRatio: 0.05,
        });
      });
    }
  });
});

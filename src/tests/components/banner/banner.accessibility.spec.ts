import { expect, test } from "@playwright/test";
import { DEFAULT_VIEWPORT, NARROW_VIEWPORT, STORYBOOK_URL } from "../../../utils/config";
import { runA11ySuite } from "../../../utils/runA11ySuite";

const RTL_STORY_URL = `${STORYBOOK_URL}/iframe.html?id=components-banner--right-to-left&viewMode=story`;

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-banner--default&viewMode=story`,
  },
  {
    name: "right to left",
    url: `/iframe.html?id=components-banner--right-to-left&viewMode=story`,
  },
];

const RTL_VIEWPORTS = [
  { name: "narrow", ...NARROW_VIEWPORT },
  { name: "wide", ...DEFAULT_VIEWPORT },
] as const;

runA11ySuite({
  suiteName: "Banner",
  include: ".nj-banner",
  cases: TEST_CASES,
});

test.describe("Banner right-to-left layout", () => {
  for (const viewport of RTL_VIEWPORTS) {
    test(`uses logical spacing without overflow at the ${viewport.name} viewport`, async ({
      page,
    }) => {
      await page.setViewportSize(viewport);
      await page.goto(RTL_STORY_URL);

      const bannerItems = page.locator(".nj-banner__header li");
      const firstItem = bannerItems.first();
      const lastItem = bannerItems.last();
      const seal = page.locator(".nj-banner__header-seal");
      const mailIcon = page.locator(".nj-banner__mail-icon");

      await expect(page.locator('[dir="rtl"]')).toHaveCount(1);
      await expect(bannerItems).toHaveCount(2);
      await expect(firstItem).toHaveCSS("margin-inline-end", "8px");
      await expect(firstItem).toHaveCSS("padding-inline-end", "8px");
      await expect(firstItem).toHaveCSS("border-inline-end-width", "1px");
      await expect(firstItem).toHaveCSS("border-left-width", "1px");
      await expect(firstItem).toHaveCSS("border-right-width", "0px");
      await expect(lastItem).toHaveCSS("margin-inline-end", "0px");
      await expect(lastItem).toHaveCSS("padding-inline-end", "0px");
      await expect(lastItem).toHaveCSS("border-inline-end-width", "0px");
      await expect(seal).toHaveCSS("padding-inline-end", "8px");
      await expect(seal).toHaveCSS("padding-left", "8px");
      await expect(seal).toHaveCSS("padding-right", "0px");
      await expect(mailIcon).toHaveCSS("margin-inline-end", "4px");
      await expect(mailIcon).toHaveCSS("margin-left", "4px");
      await expect(mailIcon).toHaveCSS("margin-right", "0px");

      if (viewport.name === "narrow") {
        await expect(firstItem).toBeHidden();
      } else {
        await expect(firstItem).toBeVisible();
      }

      const hasHorizontalOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
      );
      expect(hasHorizontalOverflow).toBe(false);
    });
  }
});

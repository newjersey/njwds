import { expect, test } from "@playwright/test";
import { DEFAULT_VIEWPORT, NARROW_VIEWPORT, STORYBOOK_URL } from "../../../../utils/config";
import { runA11ySuite } from "../../../../utils/runA11ySuite";

const COMPOSED_HEADER_URL = `${STORYBOOK_URL}/iframe.html?id=components-header--with-language-selector&viewMode=story`;

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-header--default&viewMode=story`,
  },
  {
    name: "extended",
    url: `/iframe.html?id=components-header--extended&viewMode=story`,
  },
  {
    name: "with language selector",
    url: `/iframe.html?id=components-header--with-language-selector&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Header",
  include: ".usa-header",
  cases: TEST_CASES,
});

test.describe("Header disclosure composition", () => {
  test("connects controls and keeps the desktop composition visible", async ({ page }) => {
    await page.setViewportSize(DEFAULT_VIEWPORT);
    await page.goto(COMPOSED_HEADER_URL);

    const navigation = page.locator(".usa-nav");
    const languageButton = page.locator(".usa-language__link");
    const languageItem = navigation.locator(".usa-nav__primary-item").filter({
      has: languageButton,
    });
    const search = navigation.locator(".usa-search");
    const navigationId = await navigation.getAttribute("id");

    expect(navigationId).not.toBeNull();
    if (navigationId === null) {
      throw new Error("The primary navigation must have an ID.");
    }
    await expect(page.locator(".usa-menu-btn")).toHaveAttribute("aria-controls", navigationId);
    await expect(page.locator(".usa-nav__close")).toHaveAttribute("aria-controls", navigationId);
    await expect(languageItem).toHaveCount(1);
    await expect(languageButton).toBeVisible();
    await expect(languageButton).toBeInViewport();
    await expect(search).toBeVisible();

    const languageButtonBounds = await languageButton.boundingBox();
    const searchBounds = await search.boundingBox();

    if (languageButtonBounds === null || searchBounds === null) {
      throw new Error("The language selector and search must have visible bounds.");
    }
    expect(languageButtonBounds.x + languageButtonBounds.width).toBeLessThanOrEqual(searchBounds.x);

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);
  });

  test("Escape closes the language selector before the mobile navigation", async ({ page }) => {
    await page.setViewportSize(NARROW_VIEWPORT);
    await page.goto(COMPOSED_HEADER_URL);

    const navigation = page.locator(".usa-nav");
    const languageButton = page.locator(".usa-language__link");
    const languageOptions = page.locator(".usa-language__submenu");

    await page.locator(".usa-menu-btn").click();
    await expect(languageButton).toBeVisible();
    await expect(languageButton).toBeInViewport();

    const hasHorizontalOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    );
    expect(hasHorizontalOverflow).toBe(false);

    await languageButton.click();
    await expect(navigation).toBeVisible();
    await expect(languageOptions).toBeVisible();

    await page.keyboard.press("Escape");

    await expect(languageOptions).toBeHidden();
    await expect(navigation).toBeVisible();
    await expect(languageButton).toBeFocused();
  });
});

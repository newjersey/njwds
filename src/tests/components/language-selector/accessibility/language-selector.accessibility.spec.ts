import { expect, test } from "@playwright/test";
import { STORYBOOK_URL } from "../../../../utils/config";
import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-language-selector--simple-toggle&viewMode=story`,
  },
  {
    name: "dropdown",
    url: `/iframe.html?id=components-language-selector--dropdown-menu&viewMode=story`,
  },
  {
    name: "multiple dropdowns",
    url: `/iframe.html?id=components-language-selector--multiple-dropdown-menus&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Language selector",
  include: ".usa-language-container",
  cases: TEST_CASES,
});

test.describe("Language selector semantics", () => {
  test("connects every disclosure to a unique submenu", async ({ page }) => {
    await page.goto(
      `${STORYBOOK_URL}/iframe.html?id=components-language-selector--multiple-dropdown-menus&viewMode=story`,
    );

    const buttons = page.locator(".usa-language__link");
    const controlledIds = await buttons.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("aria-controls")),
    );

    expect(new Set(controlledIds).size).toBe(controlledIds.length);

    for (const controlledId of controlledIds) {
      expect(controlledId).not.toBeNull();
      await expect(page.locator(`#${controlledId}`)).toHaveCount(1);
    }
  });

  test("identifies each language and the current page", async ({ page }) => {
    await page.goto(
      `${STORYBOOK_URL}/iframe.html?id=components-language-selector--dropdown-menu&viewMode=story`,
    );

    const languageLinks = page.locator(".usa-language__submenu a");

    await expect(languageLinks).toHaveCount(5);
    await expect(languageLinks.filter({ hasText: "English" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    await expect(languageLinks.filter({ hasText: "العربية" })).toHaveAttribute("hreflang", "ar");
    await expect(page.locator('span[lang="ar"]')).toHaveAttribute("dir", "rtl");
    await expect(page.locator('span[lang="en"]', { hasText: "(Arabic)" })).toHaveAttribute(
      "lang",
      "en",
    );
  });
});

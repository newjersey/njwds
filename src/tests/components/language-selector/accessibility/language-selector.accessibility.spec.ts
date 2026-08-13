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

const LANGUAGE_CASES = [
  {
    nativeName: "English",
    translation: null,
    language: "en",
    direction: "ltr",
    isCurrent: true,
  },
  {
    nativeName: "Español",
    translation: "(Spanish)",
    language: "es",
    direction: "ltr",
    isCurrent: false,
  },
  {
    nativeName: "Français",
    translation: "(French)",
    language: "fr",
    direction: "ltr",
    isCurrent: false,
  },
  {
    nativeName: "Italiano",
    translation: "(Italian)",
    language: "it",
    direction: "ltr",
    isCurrent: false,
  },
  {
    nativeName: "العربية",
    translation: "(Arabic)",
    language: "ar",
    direction: "rtl",
    isCurrent: false,
  },
] as const;

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

    for (const languageCase of LANGUAGE_CASES) {
      const languageLink = languageLinks.filter({ hasText: languageCase.nativeName });
      const nativeName = languageLink.locator("span").first();
      const translation = languageLink.locator("span").nth(1);

      await expect(languageLink).toHaveCount(1);
      await expect(languageLink).toHaveAttribute("hreflang", languageCase.language);
      await expect(nativeName).toHaveText(languageCase.nativeName);
      await expect(nativeName).toHaveAttribute("lang", languageCase.language);
      await expect(nativeName).toHaveAttribute("dir", languageCase.direction);

      if (languageCase.translation === null) {
        await expect(translation).toHaveCount(0);
      } else {
        await expect(translation).toHaveText(languageCase.translation);
        await expect(translation).toHaveAttribute("lang", "en");
        await expect(translation).toHaveAttribute("dir", "ltr");
      }

      if (languageCase.isCurrent) {
        await expect(languageLink).toHaveAttribute("aria-current", "page");
      } else {
        await expect(languageLink).not.toHaveAttribute("aria-current", "page");
      }
    }
  });
});

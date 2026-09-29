import { expect, test } from "@playwright/test";
import { STORYBOOK_URL } from "../../../../utils/config";
import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-footer--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `/iframe.html?id=components-footer--default&viewMode=story&args=variant:Big`,
  },
  {
    name: "Slim",
    url: `/iframe.html?id=components-footer--default&viewMode=story&args=variant:Slim`,
  },
];

runA11ySuite({
  suiteName: "Footer",
  include: ".usa-footer",
  cases: TEST_CASES,
});

test.describe("Footer responsive layout", () => {
  for (const { name, url } of TEST_CASES) {
    test(`${name} does not overflow a 320px viewport`, async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 800 });
      await page.goto(`${STORYBOOK_URL}${url}`);

      const dimensions = await page.locator("html").evaluate((element) => ({
        clientWidth: element.clientWidth,
        scrollWidth: element.scrollWidth,
      }));

      expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
    });
  }
});

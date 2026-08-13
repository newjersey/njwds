import { expect, test, type Route } from "@playwright/test";
import { STORYBOOK_URL } from "../../../../utils/config";
import { runA11ySuite } from "../../../../utils/runA11ySuite";

const STORY_URL = `/iframe.html?id=components-feedback-widget--default&viewMode=story`;

const fulfillFeedbackRequest = async (route: Route) => {
  await route.fulfill({
    body: JSON.stringify({
      feedbackId: "storybook-feedback-id",
      message: "Success",
    }),
    contentType: "application/json",
    status: 200,
  });
};

runA11ySuite({
  suiteName: "Feedback widget",
  include: "feedback-widget",
  cases: [
    {
      name: "default",
      url: STORY_URL,
    },
  ],
});

test.describe("Feedback widget integration", () => {
  test("uses documented attributes and completes the mocked comment step", async ({ page }) => {
    await page.route("https://innovation.nj.gov/app/feedback/dev/**", fulfillFeedbackRequest);
    await page.goto(`${STORYBOOK_URL}${STORY_URL}`);

    const widget = page.locator("feedback-widget");

    await expect(widget).toHaveAttribute("skip-email-step", "false");
    await expect(widget).toHaveAttribute("show-comment-disclaimer", "true");
    await expect(widget).toHaveAttribute("only-save-rating-to-analytics", "false");
    await expect(widget).not.toHaveAttribute("skipEmailStep");

    await widget.locator("#yesButton").click();
    await widget.locator('textarea[name="comment"]').fill("The page answered my question.");
    await widget.locator("#commentSubmit").click();

    await expect(widget.locator("#emailPrompt")).toBeVisible();
  });
});

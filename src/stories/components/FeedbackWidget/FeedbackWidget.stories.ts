import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { FeedbackWidget } from "./FeedbackWidget";
import "@newjersey/feedback-widget/feedback-widget.min.js";
import { initFeedbackMocks } from "./feedbackApiMock.js";

const meta = {
  title: "Components/Feedback Widget",
  tags: ["autodocs"],
  render: () => FeedbackWidget(),
  decorators: [
    (story) => {
      // Initialize mock fetch responses for the feedback widget
      initFeedbackMocks(500);
      return story();
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { InPageNavigation, type InPageNavigationProps } from "./InPageNavigation";
// @ts-expect-error - no types for uswds subpath
import inPageNav from "@uswds/uswds/js/usa-in-page-navigation";

const meta = {
  title: "Components/In-page navigation",
  tags: ["autodocs"],
  render: InPageNavigation,
  decorators: [
    (story) => {
      useEffect(() => {
        inPageNav.off(document.body);
        inPageNav.on(document.body);
      }, []);

      return story();
    },
  ],
} satisfies Meta<InPageNavigationProps>;

export default meta;
type Story = StoryObj<InPageNavigationProps>;

export const Default: Story = {
  args: {
    label: "On this page",
    hideContentInStorybook: false,
  },
};

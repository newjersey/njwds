import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Tooltip, type TooltipProps } from "./Tooltip";
// @ts-expect-error - no types for uswds subpath
import tooltip from "@uswds/uswds/js/usa-tooltip";

const meta = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  render: () => Tooltip(),
  decorators: [
    (story) => {
      useEffect(() => {
        tooltip.init(document.body);
      }, []);

      return story();
    },
  ],
} satisfies Meta<TooltipProps>;

export default meta;
type Story = StoryObj<TooltipProps>;

export const Default: Story = {};

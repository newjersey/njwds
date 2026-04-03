import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { AspectRatio } from "./AspectRatio";

const meta = {
  title: "Utilities/Aspect Ratio",
  tags: ["autodocs"],
  render: () => AspectRatio(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

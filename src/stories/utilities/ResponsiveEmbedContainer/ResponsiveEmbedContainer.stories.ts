import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { ResponsiveEmbedContainer } from "./ResponsiveEmbedContainer";

const meta = {
  title: "Utilities/Responsive embed container",
  tags: ["autodocs"],
  render: () => ResponsiveEmbedContainer(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

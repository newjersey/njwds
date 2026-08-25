import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { SummaryBox } from "./SummaryBox";

const meta = {
  title: "Components/Summary box",
  tags: ["autodocs"],
  render: () => SummaryBox(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

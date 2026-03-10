import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Date, type DateProps } from "./Date";

const meta = {
  title: "Patterns/Date",
  tags: ["autodocs"],
  render: (args) => Date(args),
  argTypes: {},
} satisfies Meta<DateProps>;

export default meta;
type Story = StoryObj<DateProps>;

export const Default: Story = {};

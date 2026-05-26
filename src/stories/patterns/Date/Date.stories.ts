import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Date, type DateProps } from "./Date";

const meta = {
  title: "Patterns/Date",
  tags: ["autodocs"],
  render: (args) => Date(args),
  argTypes: {},
} satisfies Meta<DateProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: true,
    error: false,
  },
};

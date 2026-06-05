import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Name, type NameProps } from "./Name";

const meta = {
  title: "Templates/Name form",
  tags: ["autodocs"],
  render: (args) => Name(args),
} satisfies Meta<NameProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: true,
    error: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { IconList, type IconListProps } from "./IconList";

const meta = {
  title: "Components/Icon List",
  tags: ["autodocs"],
  render: (args) => IconList(args),
  argTypes: {
    richContent: {
      control: { type: "boolean" },
    },
    size: {
      control: { type: "select" },
      options: ["default", "md", "lg", "xl", "2xl"],
    },
  },
} satisfies Meta<IconListProps>;

export default meta;
type Story = StoryObj<IconListProps>;

export const Default: Story = {
  args: {
    richContent: false,
    size: "default",
  },
};

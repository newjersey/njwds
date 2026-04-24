import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { IconList, type IconListProps } from "./IconList";

const meta = {
  title: "Components/Icon List",
  tags: ["autodocs"],
  render: (args) => IconList(args),
  argTypes: {
    richtext: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<IconListProps>;

export default meta;
type Story = StoryObj<IconListProps>;

export const Default: Story = {
  args: {
    richtext: false,
    largeSize: false,
  },
};

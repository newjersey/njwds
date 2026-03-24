import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Icon, type IconProps } from "./Icon";

const meta = {
  title: "Components/Icon",
  tags: ["autodocs"],
  render: (args) => Icon(args),
  argTypes: {
    size: {
      control: { type: "select" },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
  },
} satisfies Meta<IconProps>;

export default meta;
type Story = StoryObj<IconProps>;

export const Basic: Story = {
  args: {
    size: 4,
  },
};

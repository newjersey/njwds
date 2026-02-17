import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Tag, type TagProps } from "./Tag";

const meta = {
  title: "Elements/Tag",
  tags: ["autodocs"],
  render: (args) => Tag(args),
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "big"],
    },
  },
} satisfies Meta<TagProps>;

export default meta;
type Story = StoryObj<TagProps>;

export const Basic: Story = {
  args: {
    label: "New",
    size: "small",
  },
};

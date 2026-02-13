import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { List, type ListProps } from "./List";

const meta = {
  title: "Elements/List",
  tags: ["autodocs"],
  render: (args) => List(args),
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["Unordered List", "Ordered List"],
    },
  },
} satisfies Meta<ListProps>;

export default meta;
type Story = StoryObj<ListProps>;

export const Basic: Story = {
  args: {
    label: "List text",
    type: "Unordered List",
    styled: true,
  },
};

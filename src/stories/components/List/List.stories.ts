import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { List, type ListProps } from "./List";

const meta = {
  title: "Components/List",
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

export const Default: Story = {
  args: {
    label: "List text",
    type: "Unordered List",
    unstyled: false,
  },
};

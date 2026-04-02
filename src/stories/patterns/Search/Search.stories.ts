import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Search, type SearchProps } from "./Search";

const meta = {
  title: "Patterns/Search",
  tags: ["autodocs"],
  render: (args) => Search(args),
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["Default", "Big", "Small"],
    },
  },
} satisfies Meta<SearchProps>;

export default meta;
type Story = StoryObj<SearchProps>;

export const Default: Story = {
  args: {
    size: "Default",
  },
};

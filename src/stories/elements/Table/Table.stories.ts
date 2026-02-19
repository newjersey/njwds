import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Table, type TableProps } from "./Table";

const meta = {
  title: "Elements/Table",
  tags: ["autodocs"],
  render: (args) => Table(args),
  argTypes: {
    border: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<TableProps>;

export default meta;
type Story = StoryObj<TableProps>;

export const Basic: Story = {
  args: {
    border: true,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Table, type TableProps } from "./Table";

const meta = {
  title: "Components/Table",
  tags: ["autodocs"],
  render: (args) => Table(args),
  argTypes: {
    responsiveStack: {
      description: "Resize browser window to see this",
    },
  },
} satisfies Meta<TableProps>;

export default meta;
type Story = StoryObj<TableProps>;

export const Default: Story = {
  args: {
    border: true,
    compact: false,
    scrollable: false,
    sortable: false,
    striped: false,
    responsiveStack: false,
    stickyHeaders: false,
  },
};

export const Compact: Story = {
  args: {
    border: true,
    compact: true,
    scrollable: false,
    sortable: false,
    striped: false,
    responsiveStack: false,
    stickyHeaders: false,
  },
};

export const Scrollable: Story = {
  args: {
    border: true,
    compact: false,
    scrollable: true,
    sortable: false,
    striped: false,
    responsiveStack: false,
    stickyHeaders: false,
  },
};

export const Sortable: Story = {
  args: {
    border: true,
    compact: false,
    scrollable: false,
    sortable: true,
    striped: false,
    responsiveStack: false,
    stickyHeaders: false,
  },
};

export const Striped: Story = {
  args: {
    border: true,
    compact: false,
    scrollable: false,
    sortable: false,
    striped: true,
    responsiveStack: false,
    stickyHeaders: false,
  },
};

export const Responsive: Story = {
  args: {
    border: true,
    compact: false,
    scrollable: false,
    sortable: false,
    striped: false,
    responsiveStack: true,
    stickyHeaders: false,
  },
};

export const StickyHeaders: Story = {
  args: {
    border: true,
    compact: false,
    scrollable: false,
    sortable: false,
    striped: false,
    responsiveStack: false,
    stickyHeaders: true,
  },
};

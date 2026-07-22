import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Table, type TableProps } from "./Table";
// @ts-expect-error - no types for uswds subpath
import modal from "@uswds/uswds/js/usa-table";

const meta = {
  title: "Components/Table",
  tags: ["autodocs"],
  render: (args) => {
    useEffect(() => {
      if (args.sortable === true) {
        modal.init(document.body);
      } else {
        // There doesn't appear to be a USWDS teardown method for the sortable table, so here we are
        document.querySelectorAll(".usa-table__header__button").forEach((el) => el.remove());
        document.querySelectorAll("[aria-sort]").forEach((el) => el.removeAttribute("aria-sort"));
        document
          .querySelectorAll("[data-sort-active]")
          .forEach((el) => el.removeAttribute("data-sort-active"));
        document
          .querySelectorAll("th[aria-label]")
          .forEach((el) => el.removeAttribute("aria-label"));
      }
    }, [args.sortable]);

    return Table(args);
  },
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

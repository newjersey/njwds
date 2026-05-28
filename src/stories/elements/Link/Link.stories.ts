import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Link, type LinkProps } from "./Link";

const meta = {
  title: "Elements/Link",
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
    external: {
      control: { type: "boolean" },
    },
  },
  render: (args) => Link(args),
} satisfies Meta<LinkProps>;

export default meta;
type Story = StoryObj<LinkProps>;

export const Default: Story = {
  args: {
    label: "Link text",
    mode: "light",
    external: false,
    forceVisited: false,
  },
};

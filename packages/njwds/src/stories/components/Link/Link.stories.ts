import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Link, type LinkProps } from "./Link";

const meta = {
  title: "Components/Link",
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

export const External: Story = {
  args: {
    label: "Link text",
    mode: "light",
    external: true,
    forceVisited: false,
  },
};

export const forceVisited: Story = {
  args: {
    label: "Link text",
    mode: "light",
    external: false,
    forceVisited: true,
  },
};

export const Dark: Story = {
  args: {
    label: "Link text",
    mode: "dark",
    external: false,
    forceVisited: false,
  },
};

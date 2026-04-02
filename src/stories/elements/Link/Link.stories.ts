import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Link, type LinkProps } from "./Link";

const meta = {
  title: "Elements/Link",
  tags: ["autodocs"],
  render: (args) => Link(args),
} satisfies Meta<LinkProps>;

export default meta;
type Story = StoryObj<LinkProps>;

export const Basic: Story = {
  args: {
    label: "Link text",
    external: false,
  },
};

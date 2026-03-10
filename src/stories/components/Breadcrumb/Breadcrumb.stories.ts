import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Breadcrumb, type BreadcrumbProps } from "./Breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  tags: ["autodocs"],
  render: (args) => Breadcrumb(args),
} satisfies Meta<BreadcrumbProps>;

export default meta;
type Story = StoryObj<BreadcrumbProps>;

export const Default: Story = {
  args: {
    wrap: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Address, type AddressProps } from "./Address";

const meta = {
  title: "Templates/Address form",
  tags: ["autodocs"],
  render: (args) => Address(args),
} satisfies Meta<AddressProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: false,
    error: false,
  },
};

export const Error: Story = {
  args: {
    required: true,
    helperText: false,
    error: true,
  },
};

export const HelperText: Story = {
  args: {
    required: false,
    helperText: true,
    error: false,
  },
};

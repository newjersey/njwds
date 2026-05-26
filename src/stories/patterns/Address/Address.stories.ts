import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Address, type AddressProps } from "./Address";

const meta = {
  title: "Patterns/Address",
  tags: ["autodocs"],
  render: (args) => Address(args),
} satisfies Meta<AddressProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: true,
    error: false,
  },
};

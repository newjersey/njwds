import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Address, type AddressProps } from "./Address";

const meta = {
  title: "Patterns/Address",
  tags: ["autodocs"],
  render: (args) => Address(args),
  argTypes: {},
} satisfies Meta<AddressProps>;

export default meta;
type Story = StoryObj<AddressProps>;

export const Default: Story = {};

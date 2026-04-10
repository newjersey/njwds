import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Address } from "./Address";

const meta = {
  title: "Patterns/Address",
  tags: ["autodocs"],
  render: () => Address(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

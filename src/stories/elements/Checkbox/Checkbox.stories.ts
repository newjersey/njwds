import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Checkbox, type CheckboxProps } from "./Checkbox";

const meta = {
  title: "Elements/Checkbox",
  tags: ["autodocs"],
  render: (args) => Checkbox(args),
  argTypes: {
    tile: {
      control: { type: "boolean" },
      options: [true, false],
    },
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<CheckboxProps>;

export default meta;
type Story = StoryObj<CheckboxProps>;

export const Default: Story = {
  args: {
    label: "Checkbox Label",
    tile: false,
  },
};

export const Tile: Story = {
  args: {
    label: "Tile Checkbox Label",
    tile: true,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Checkbox, type CheckboxProps } from "./Checkbox";

const meta = {
  title: "Components/Checkbox",
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
    required: false,
    labelDescription: false,
    helperText: false,
    error: false,
  },
};

export const helperText: Story = {
  args: {
    label: "Checkbox Label",
    tile: false,
    required: false,
    labelDescription: false,
    helperText: true,
    error: false,
  },
};

export const Tile: Story = {
  args: {
    label: "Tile Checkbox Label",
    tile: true,
    required: false,
    labelDescription: false,
    helperText: true,
    error: false,
  },
};

export const Error: Story = {
  args: {
    label: "Checkbox Label",
    tile: false,
    required: true,
    labelDescription: false,
    helperText: true,
    error: true,
  },
};

export const labelDescription: Story = {
  args: {
    label: "Checkbox Label",
    tile: false,
    required: false,
    labelDescription: true,
    helperText: true,
    error: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Radio, type RadioProps } from "./Radio";

const meta = {
  title: "Components/Radio",
  tags: ["autodocs"],
  render: (args) => Radio(args),
  argTypes: {
    tile: {
      control: { type: "boolean" },
      options: [true, false],
    },
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<RadioProps>;

export default meta;
type Story = StoryObj<RadioProps>;

export const Default: Story = {
  args: {
    label: "Radio Label",
    tile: false,
    required: false,
    labelDescription: false,
    helperText: false,
    error: false,
  },
};

export const helperText: Story = {
  args: {
    label: "Radio Label",
    tile: false,
    required: false,
    labelDescription: false,
    helperText: true,
    error: false,
  },
};

export const Tile: Story = {
  args: {
    label: "Tile Radio Label",
    tile: true,
    required: false,
    labelDescription: false,
    helperText: true,
    error: false,
  },
};

export const Error: Story = {
  args: {
    label: "Radio Label",
    tile: false,
    required: true,
    labelDescription: false,
    helperText: true,
    error: true,
  },
};

export const labelDescription: Story = {
  args: {
    label: "Radio Label",
    tile: false,
    required: false,
    labelDescription: true,
    helperText: true,
    error: false,
  },
};

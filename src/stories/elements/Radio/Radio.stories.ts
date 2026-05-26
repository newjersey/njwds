import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Radio, type RadioProps } from "./Radio";

const meta = {
  title: "Elements/Radio",
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
    helperText: true,
    error: false,
  },
};

export const Tile: Story = {
  args: {
    label: "Tile Radio Label",
    tile: true,
    required: false,
    helperText: true,
    error: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Range, type RangeProps } from "./Range";

const meta = {
  title: "Elements/Range Slider",
  tags: ["autodocs"],
  render: (args) => Range(args),
  argTypes: {
    label: {
      control: { type: "text" },
    },
    min: {
      control: { type: "number" },
    },
    max: {
      control: { type: "number" },
    },
    step: {
      control: { type: "number" },
    },
    value: {
      control: { type: "number" },
    },
  },
} satisfies Meta<RangeProps>;

export default meta;
type Story = StoryObj<RangeProps>;

export const Default: Story = {
  args: {
    label: "Range slider label",
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  },
};

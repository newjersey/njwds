import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Select, type SelectProps } from "./Select";

const meta = {
  title: "Elements/Select",
  tags: ["autodocs"],
  render: (args) => Select(args),
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<SelectProps>;

export default meta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    label: "Select label",
    error: false,
    required: false,
    helperText: false,
  },
};

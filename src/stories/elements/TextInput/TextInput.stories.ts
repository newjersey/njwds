import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Input, type InputProps } from "./TextInput";

const meta = {
  title: "Elements/Text Input",
  tags: ["autodocs"],
  render: (args) =>
    Input({
      ...args,
      error: args.error && !args.success,
      success: args.success && !args.error,
    }),
  argTypes: {
    label: {
      control: { type: "text" },
    },
    error: {
      if: { arg: "success", truthy: false },
    },
    success: {
      if: { arg: "error", truthy: false },
    },
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    label: "Input label",
    helperText: false,
    required: false,
    error: false,
    success: false,
  },
};

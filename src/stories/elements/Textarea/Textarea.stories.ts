import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Textarea, type TextareaProps } from "./Textarea";
import "@uswds/uswds";

const meta = {
  title: "Elements/Textarea",
  tags: ["autodocs"],
  render: (args) =>
    Textarea({
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
} satisfies Meta<TextareaProps>;

export default meta;
type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    label: "Textarea label",
    helperText: true,
    required: false,
    error: false,
    success: false,
    characterCounter: true,
  },
};

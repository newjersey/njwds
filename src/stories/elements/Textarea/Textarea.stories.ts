import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Textarea, type TextareaProps } from "./Textarea";
// @ts-expect-error - no types for uswds subpath
import characterCount from "@uswds/uswds/js/usa-character-count";

const meta = {
  title: "Elements/Textarea",
  tags: ["autodocs"],
  render: (args) =>
    Textarea({
      ...args,
      error: args.error && !args.success,
      success: args.success && !args.error,
    }),
  decorators: [
    (story) => {
      const result = story();
      setTimeout(() => {
        characterCount.off(document.body);
        characterCount.on(document.body);
      }, 0);
      return result;
    },
  ],
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

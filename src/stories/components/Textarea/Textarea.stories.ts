import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { useEffect } from "storybook/internal/preview-api";
import { Textarea, type TextareaProps } from "./Textarea";
// @ts-expect-error - no types for uswds subpath
import characterCount from "@uswds/uswds/js/usa-character-count";

const meta = {
  title: "Components/Textarea",
  tags: ["autodocs"],
  render: (args) =>
    Textarea({
      ...args,
      error: args.error && !args.success,
      success: args.success && !args.error,
    }),
  decorators: [
    (story) => {
      useEffect(() => {
        characterCount.off(document.body);
        characterCount.on(document.body);
      }, []);

      return story();
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
    width: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "xl", "2xl"],
    },
  },
} satisfies Meta<TextareaProps>;

export default meta;
type Story = StoryObj<TextareaProps>;

export const Default: Story = {
  args: {
    label: "Textarea label",
    required: false,
    helperText: true,
    error: false,
    characterCounter: true,
    width: "xl",
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { useEffect } from "storybook/internal/preview-api";
import { Password, type PasswordProps } from "./Password";
// @ts-expect-error - no types for uswds subpath
import passwordToggle from "@uswds/uswds/js/_usa-password";

const meta = {
  title: "Patterns/Password reset",
  tags: ["autodocs"],
  render: (args) => Password(args),
  decorators: [
    (story) => {
      useEffect(() => {
        passwordToggle.on();
      }, []);

      return story();
    },
  ],
} satisfies Meta<PasswordProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: false,
    error: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { useEffect } from "storybook/internal/preview-api";
import { Signin, type SigninProps } from "./Signin";
// @ts-expect-error - no types for uswds subpath
import passwordToggle from "@uswds/uswds/js/_usa-password";

const meta = {
  title: "Patterns/Sign in",
  tags: ["autodocs"],
  render: (args) => Signin(args),
  decorators: [
    (story) => {
      useEffect(() => {
        passwordToggle.on();
      }, []);

      return story();
    },
  ],
} satisfies Meta<SigninProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: false,
    error: false,
  },
};

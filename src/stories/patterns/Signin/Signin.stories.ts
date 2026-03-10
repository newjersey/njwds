import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Signin } from "./Signin";
// @ts-expect-error - no types for uswds subpath
import passwordToggle from "@uswds/uswds/js/_usa-password";

const meta = {
  title: "Patterns/Sign in form",
  tags: ["autodocs"],
  render: Signin,
  decorators: [
    (story) => {
      const result = story();
      setTimeout(() => {
        // Call the behavior to attach event listeners
        passwordToggle.on();
      }, 100);
      return result;
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

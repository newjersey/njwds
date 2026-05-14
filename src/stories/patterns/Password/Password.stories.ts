import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Password } from "./Password";
// @ts-expect-error - no types for uswds subpath
import passwordToggle from "@uswds/uswds/js/_usa-password";

const meta = {
  title: "Patterns/Password reset",
  tags: ["autodocs"],
  render: Password,
  decorators: [
    (story) => {
      useEffect(() => {
        passwordToggle.on();
      }, []);

      return story();
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

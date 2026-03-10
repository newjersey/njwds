import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Password, type PasswordProps } from "./Password";

const meta = {
  title: "Patterns/Password",
  tags: ["autodocs"],
  render: (args) => Password(args),
  argTypes: {},
} satisfies Meta<PasswordProps>;

export default meta;
type Story = StoryObj<PasswordProps>;

export const Default: Story = {};

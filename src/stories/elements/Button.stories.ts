import type { Meta, StoryObj } from "@storybook/web-components-vite";

import type { ButtonProps } from "./Button";
import { Button } from "./Button";

const meta = {
  title: "Elements/Button",
  tags: ["autodocs"],
  render: (args) => Button(args),
  argTypes: {
    theme: {
      control: { type: "select" },
      options: ["light", "dark", "danger"],
    },
    type: {
      table: { disable: true },
    },
  },
} satisfies Meta<ButtonProps>;

export default meta;
type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    label: "Button",
    type: "primary",
    theme: "light",
    icon: false,
  },
};

export const Secondary: Story = {
  args: {
    label: "Button",
    type: "outline",
    theme: "light",
    icon: false,
  },
};

export const Tertiary: Story = {
  args: {
    label: "Button",
    type: "unstyled",
    theme: "light",
    icon: false,
  },
};

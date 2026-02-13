import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Button, type ButtonProps } from "./Button";

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
      control: { type: "select" },
      options: ["primary", "secondary", "tertiary"],
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
    type: "secondary",
    theme: "light",
    icon: false,
  },
};

export const Tertiary: Story = {
  args: {
    label: "Button",
    type: "tertiary",
    theme: "light",
    icon: false,
  },
};

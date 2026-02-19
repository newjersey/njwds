import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Alert, type AlertProps } from "./Alert";

const meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  render: (args) => Alert(args),
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["default", "info", "success", "warning", "error"],
    },
    slim: {
      control: { type: "boolean" },
    },
    header: {
      control: { type: "boolean" },
    },
    icon: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<AlertProps>;

export const Basic: Story = {
  args: {
    heading: "Alert heading",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "default",
    slim: false,
    icon: false,
    header: true,
  },
};

export const Info: Story = {
  args: {
    heading: "Informative status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "info",
    slim: false,
    icon: false,
    header: true,
  },
};

export const Success: Story = {
  args: {
    heading: "Success status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "success",
    slim: false,
    icon: false,
    header: true,
  },
};

export const Warning: Story = {
  args: {
    heading: "Warning status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "warning",
    slim: false,
    icon: false,
    header: true,
  },
};

export const Error: Story = {
  args: {
    heading: "Error status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "error",
    slim: false,
    icon: false,
    header: true,
  },
};

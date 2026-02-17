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
    heading: "alert heading",
    text: "alert text",
    type: "default",
    slim: false,
    icon: false,
    header: false,
  },
};

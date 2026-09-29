import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Select, type SelectProps } from "./Select";

const meta = {
  title: "Components/Select",
  tags: ["autodocs"],
  render: (args) => Select(args),
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<SelectProps>;

export default meta;
type Story = StoryObj<SelectProps>;

export const Default: Story = {
  args: {
    label: "Select label",
    required: false,
    helperText: false,
    error: false,
  },
};

export const Error: Story = {
  args: {
    label: "Select label",
    required: true,
    helperText: true,
    error: true,
  },
};

export const HelperText: Story = {
  args: {
    label: "Select label",
    required: false,
    helperText: true,
    error: false,
  },
};

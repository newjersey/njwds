import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Input, type InputProps } from "./TextInput";

const meta = {
  title: "Components/Text input",
  tags: ["autodocs"],
  render: (args) => Input(args),
  argTypes: {
    label: {
      control: { type: "text" },
    },
    width: {
      control: { type: "select" },
      options: ["sm", "md", "lg", "xl", "2xl"],
    },
  },
} satisfies Meta<InputProps>;

export default meta;
type Story = StoryObj<InputProps>;

export const Default: Story = {
  args: {
    label: "Input label",
    required: false,
    helperText: true,
    error: false,
    width: "xl",
  },
};

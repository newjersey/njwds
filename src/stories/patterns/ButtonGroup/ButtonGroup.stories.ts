import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { ButtonGroup, type ButtonGroupProps } from "./ButtonGroup";

const meta = {
  title: "Patterns/Button Group",
  tags: ["autodocs"],
  render: (args) => ButtonGroup(args),
} satisfies Meta<ButtonGroupProps>;

export default meta;
type Story = StoryObj<ButtonGroupProps>;

export const Default: Story = {
  args: {
    segmented: false,
  },
};

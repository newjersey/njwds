import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { ProcessListComponent, type ProcessListComponentProps } from "./ProcessList";

const meta = {
  title: "Components/ProcessList",
  tags: ["autodocs"],
  render: (args) => ProcessListComponent(args),
} satisfies Meta<ProcessListComponentProps>;

export default meta;
type Story = StoryObj<ProcessListComponentProps>;

export const Default: Story = {
  args: {
    content: true,
    customSizing: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { File, type FileProps } from "./File";

const meta = {
  title: "Components/File Input",
  tags: ["autodocs"],
  render: (args) => File(args),
  argTypes: {
    label: {
      control: { type: "text" },
    },
  },
} satisfies Meta<FileProps>;

export default meta;
type Story = StoryObj<FileProps>;

export const Default: Story = {
  args: {
    label: "File input label",
    required: false,
    helperText: true,
    error: false,
  },
};

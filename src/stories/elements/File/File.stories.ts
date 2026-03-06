import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { File, type FileProps } from "./File";

const meta = {
  title: "Elements/File",
  tags: ["autodocs"],
  render: (args) => File(args),
  argTypes: {
    styled: {
      control: { type: "boolean" },
      options: [true, false],
    },
    fileTypes: {
      control: { type: "multi-select" },
      options: [".pdf", ".txt", ".doc", ".docx", ".jpg", ".png", ".gif"],
    },
  },
} satisfies Meta<FileProps>;

export default meta;
type Story = StoryObj<FileProps>;

export const Default: Story = {
  args: {
    styled: false,
  },
};

export const Styled: Story = {
  args: {
    styled: true,
  },
};

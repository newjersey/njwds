import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { FileComponent, type FileComponentProps } from "./File";
// @ts-expect-error - no types for uswds subpath
import fileInput from "@uswds/uswds/js/usa-file-input";

const meta = {
  title: "Components/File",
  tags: ["autodocs"],
  render: (args) => FileComponent(args),
  decorators: [
    (story) => {
      const result = story();
      setTimeout(() => {
        fileInput.teardown(document.body);
        fileInput.init(document.body);
      }, 0);
      return result;
    },
  ],
} satisfies Meta<FileComponentProps>;

export default meta;
type Story = StoryObj<FileComponentProps>;

export const Default: Story = {
  args: {
    fileTypes: ".pdf,.txt,.doc,.docx,.jpg,.png,.gif",
    error: false,
  },
};

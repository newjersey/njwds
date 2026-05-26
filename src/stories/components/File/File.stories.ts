import { useEffect } from "storybook/internal/preview-api";
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
      useEffect(() => {
        fileInput.teardown(document.body);
        fileInput.init(document.body);
      }, []);

      return story();
    },
  ],
} satisfies Meta<FileComponentProps>;

export default meta;
type Story = StoryObj<FileComponentProps>;

export const Default: Story = {
  args: {
    fileTypes: ".pdf,.txt,.doc,.docx,.jpg,.png,.gif",
    required: false,
    helperText: true,
    error: false,
  },
};

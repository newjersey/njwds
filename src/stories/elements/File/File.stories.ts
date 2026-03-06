import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { File } from "./File";

const meta = {
  title: "Elements/File",
  tags: ["autodocs"],
  render: () => File(),
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

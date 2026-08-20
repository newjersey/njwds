import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Link, type ProseProps } from "./Prose";

const meta = {
  title: "Components/Prose",
  tags: ["autodocs"],
  render: (args) => Link(args),
} satisfies Meta<ProseProps>;

export default meta;
type Story = StoryObj<ProseProps>;

export const Default: Story = {
  args: {
    showSpacing: false,
  },
};

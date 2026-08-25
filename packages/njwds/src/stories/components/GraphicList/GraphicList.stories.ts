import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { GraphicList, type GraphicListProps } from "./GraphicList";

const meta = {
  title: "Components/Graphic list",
  tags: ["autodocs"],
  render: (args) => GraphicList(args),
  argTypes: {
    mode: {
      control: { type: "select" },
      options: ["light", "dark"],
    },
  },
} satisfies Meta<GraphicListProps>;

export default meta;
type Story = StoryObj<GraphicListProps>;

export const Default: Story = {
  args: {
    mode: "light",
  },
};

export const Dark: Story = {
  args: {
    mode: "dark",
  },
};

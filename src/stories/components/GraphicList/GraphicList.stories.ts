import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { GraphicList } from "./GraphicList";

const meta = {
  title: "Components/Graphic list",
  tags: ["autodocs"],
  render: () => GraphicList(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

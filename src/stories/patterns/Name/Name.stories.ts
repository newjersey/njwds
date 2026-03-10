import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Name } from "./Name";

const meta = {
  title: "Patterns/Name",
  tags: ["autodocs"],
  render: () => Name(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

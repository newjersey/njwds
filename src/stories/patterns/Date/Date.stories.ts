import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Date } from "./Date";

const meta = {
  title: "Patterns/Date",
  tags: ["autodocs"],
  render: () => Date(),
  argTypes: {},
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Sidenav } from "./Sidenav";

const meta = {
  title: "Patterns/Side navigation",
  tags: ["autodocs"],
  render: () => Sidenav(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

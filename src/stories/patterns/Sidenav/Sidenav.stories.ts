import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Sidenav } from "./Sidenav";

const meta = {
  title: "Patterns/Side Navigation",
  tags: ["autodocs"],
  render: () => Sidenav(),
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

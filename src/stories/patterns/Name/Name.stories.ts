import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Name, type NameProps } from "./Name";

const meta = {
  title: "Patterns/Name",
  tags: ["autodocs"],
  render: (args) => Name(args),
  argTypes: {},
} satisfies Meta<NameProps>;

export default meta;
type Story = StoryObj<NameProps>;

export const Default: Story = {};

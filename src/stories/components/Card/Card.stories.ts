import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Card, type CardProps } from "./Card";

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: (args) => Card(args),
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["Default", "Flag"],
    },
    media: {
      control: { type: "boolean" },
    },
    flagPositionRight: {
      control: { type: "boolean" },
    },
    mediaInset: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    layout: "Default",
    media: true,
    flagPositionRight: true,
    mediaInset: false,
  },
};

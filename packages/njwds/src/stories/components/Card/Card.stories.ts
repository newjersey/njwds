import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Card, type CardProps } from "./Card";

const meta = {
  title: "Components/Card",
  tags: ["autodocs"],
  render: (args) => {
    if (args.layout === "Default") {
      args.flagPositionRight = false;
    }
    return Card(args);
  },
  argTypes: {
    layout: {
      control: { type: "select" },
      options: ["Default", "Flag"],
    },
    mediaSize: {
      control: { type: "select" },
      options: ["xs", "sm", "md", "lg", "lg-flag"],
    },
    media: {
      control: { type: "boolean" },
    },
    flagPositionRight: {
      control: { type: "boolean" },
      if: { arg: "layout", eq: "Flag" },
    },
    mediaExtend: {
      control: { type: "boolean" },
    },
    mediaFirst: {
      control: { type: "boolean" },
      if: { arg: "layout", eq: "Default" },
    },
  },
} satisfies Meta<CardProps>;

export default meta;
type Story = StoryObj<CardProps>;

export const Default: Story = {
  args: {
    layout: "Default",
    media: true,
    flagPositionRight: false,
    mediaExtend: true,
    mediaFirst: true,
    mediaSize: "md",
  },
};

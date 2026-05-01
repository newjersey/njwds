import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Collection, type CollectionProps } from "./Collection";

const meta = {
  title: "Components/Collection",
  tags: ["autodocs"],
  argTypes: {
    media: {
      control: { type: "select" },
      options: ["default", "thumbnail", "calendar"],
    },
  },
  render: (args) => Collection(args),
} satisfies Meta<CollectionProps>;

export default meta;
type Story = StoryObj<CollectionProps>;

export const Default: Story = {
  args: {
    showTags: true,
    showContent: true,
    media: "default",
    showMeta: true,
  },
};

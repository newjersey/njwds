import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Collection, type CollectionProps } from "./Collection";

const meta = {
  title: "Components/Collection",
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["default", "media", "calendar"],
    },
  },
  render: (args) => Collection(args),
} satisfies Meta<CollectionProps>;

export default meta;
type Story = StoryObj<CollectionProps>;

export const Default: Story = {
  args: {
    externalLinks: false,
    showDescription: true,
    type: "default",
    showMeta: true,
    showTags: true,
  },
};

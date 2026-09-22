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

export const WithDescription: Story = {
  args: {
    externalLinks: false,
    showDescription: true,
    type: "default",
    showMeta: true,
    showTags: true,
  },
};

export const Media: Story = {
  args: {
    externalLinks: false,
    showDescription: true,
    type: "media",
    showMeta: true,
    showTags: true,
  },
};

export const Calendar: Story = {
  args: {
    externalLinks: false,
    showDescription: true,
    type: "calendar",
    showMeta: true,
    showTags: true,
  },
};

export const WithMeta: Story = {
  args: {
    externalLinks: false,
    showDescription: true,
    type: "media",
    showMeta: true,
    showTags: true,
  },
};

export const ExternalLinks: Story = {
  args: {
    externalLinks: true,
    showDescription: true,
    type: "default",
    showMeta: true,
    showTags: true,
  },
};

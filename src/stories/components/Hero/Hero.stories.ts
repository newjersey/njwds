import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Hero, type HeroProps } from "./Hero";

const meta = {
  title: "Components/Hero",
  tags: ["autodocs"],
  render: Hero,
} satisfies Meta<HeroProps>;

export default meta;
type Story = StoryObj<HeroProps>;

export const Basic: Story = {
  args: {
    heading: "Hero callout",
    subheading: "Bring attention to a project priority",
    explainerText:
      "Support the callout with some short explanatory text. You don't need more than a couple of sentences.",
  },
};

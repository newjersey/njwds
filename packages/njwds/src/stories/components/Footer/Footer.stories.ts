import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Footer, type FooterProps } from "./Footer";

const meta = {
  title: "Components/Footer",
  tags: ["autodocs"],
  render: (args) => Footer(args),
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["Default", "Big", "Slim"],
    },
  },
} satisfies Meta<FooterProps>;

export default meta;
type Story = StoryObj<FooterProps>;

export const Default: Story = {
  args: {
    variant: "Default",
  },
};

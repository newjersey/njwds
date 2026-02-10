import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { BannerComponent } from "./Banner";

const meta = {
  title: "Components/Banner",
  tags: ["autodocs"],
  render: () => BannerComponent(),
};

export default meta;
type Story = StoryObj;

export const Banner: Story = {
  args: {
    primary: true,
    label: "Button",
  },
};

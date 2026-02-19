import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { BannerComponent, type BannerProps } from "./Banner";

const meta = {
  title: "Components/Banner",
  tags: ["autodocs"],
  render: BannerComponent,
} satisfies Meta<BannerProps>;

export default meta;
type Story = StoryObj<BannerProps>;

export const Basic: Story = {
  args: {
    governor: "Mikie Sherrill",
    ltgovernor: "Dr. Dale G. Caldwell",
  },
};

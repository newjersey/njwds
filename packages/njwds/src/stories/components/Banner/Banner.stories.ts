import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

import { BannerComponent, type BannerProps } from "./Banner";

import commonData from "../../../data/common.json";

const meta = {
  title: "Components/Banner",
  tags: ["autodocs"],
  render: BannerComponent,
} satisfies Meta<BannerProps>;

export default meta;
type Story = StoryObj<BannerProps>;

export const Default: Story = {
  args: {
    governor: commonData.gov,
    ltgovernor: commonData.govlt,
  },
};

export const RightToLeft: Story = {
  render: (args) => html`<div dir="rtl">${BannerComponent(args)}</div>`,
  args: {
    governor: commonData.gov,
    ltgovernor: commonData.govlt,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../../web-components/nj-divider/nj-divider";

const meta = {
  title: "Components/Divider (Web Component)",
  tags: ["autodocs"],
  render: () => html`<nj-divider></nj-divider>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

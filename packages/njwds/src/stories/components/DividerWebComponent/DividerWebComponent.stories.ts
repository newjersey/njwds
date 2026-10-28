import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "../../../web-components/grove-divider";

const meta = {
  title: "Components/Divider (Web Component)",
  tags: ["autodocs"],
  render: () => html`<grove-divider></grove-divider>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

const meta = {
  title: "Components/Divider",
  tags: ["autodocs"],
  render: () => html`<hr />`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

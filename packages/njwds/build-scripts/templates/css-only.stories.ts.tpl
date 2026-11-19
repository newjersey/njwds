import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";

// Styles come from dist/css/styles.css: run `npm run grove:build` before viewing
const meta = {
  title: "Components/{{Title}}",
  tags: ["autodocs"],
  render: () => html`<div class="grove-{{name}}">Example content</div>`,
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { html } from "lit";
import "@web-components/grove-{{name}}";

const meta = {
  title: "Web Components/{{Title}}",
  tags: ["autodocs"],
  render: () => html`<grove-{{name}}>Example content</grove-{{name}}>`,
  parameters: {
    docs: {
      description: {
        component: '`import "@newjersey/njwds/web-components/grove-{{name}}";`',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

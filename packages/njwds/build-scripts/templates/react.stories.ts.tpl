import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { Grove{{Name}} } from "@web-components/grove-{{name}}/grove-{{name}}.react";

const meta = {
  title: "React Components/{{Title}}",
  tags: ["autodocs"],
  // This Storybook renders web components, so mount the React wrapper with react-dom
  render: () => {
    const container = document.createElement("div");
    createRoot(container).render(createElement(Grove{{Name}}, null, "Example content"));
    return container;
  },
  parameters: {
    docs: {
      description: {
        component: '`import { Grove{{Name}} } from "@newjersey/njwds/react";`',
      },
      source: {
        code: "<Grove{{Name}}>Example content</Grove{{Name}}>",
        language: "tsx",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

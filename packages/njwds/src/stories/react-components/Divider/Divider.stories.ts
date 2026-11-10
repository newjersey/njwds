import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { createElement } from "react";
import { createRoot } from "react-dom/client";
import { GroveDivider } from "@web-components/grove-divider/grove-divider.react";

const meta = {
  title: "React Components/Divider",
  tags: ["autodocs"],
  // This Storybook renders web components, so mount the React wrapper with react-dom
  render: () => {
    const container = document.createElement("div");
    createRoot(container).render(createElement(GroveDivider));
    return container;
  },
  parameters: {
    docs: {
      description: {
        component: '`import { GroveDivider } from "@newjersey/njwds/react";`',
      },
      source: {
        code: `\n\n<GroveDivider />`,
        language: "tsx",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};

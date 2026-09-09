import type { Decorator, Preview } from "@storybook/web-components-vite";
import { html } from "lit";
import "@uswds/uswds";
import "./storybook.css";

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Global theme for components",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    theme: "light",
  },
  parameters: {
    layout: "fullscreen",
    backgrounds: {
      disable: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      options: {
        showPanel: false, // Shows the panel globally by default
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [
    ((story, context) => {
      const rendered = story();
      if (context.globals.theme !== "dark") return rendered;

      return html`<div class="usa-dark-background padding-2">${rendered}</div>`;
    }) satisfies Decorator,
  ],
};

export default preview;

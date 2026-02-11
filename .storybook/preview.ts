import type { Preview } from "@storybook/web-components-vite";
import { html } from "lit";

const preview: Preview = {
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
    (Story, context) => {
      const theme = context.args.theme;
      let className = "";

      if (theme === "dark") {
        className = "bg-base-darkest";
      }

      return html`<div class="${className} padding-2 display-block">${Story()}</div> `;
    },
  ],
};

export default preview;

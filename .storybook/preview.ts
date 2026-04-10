import type { Preview } from "@storybook/web-components-vite";
import { html } from "lit";
import type { StoryFn, StoryContext, Args } from "@storybook/web-components-vite";
import "@uswds/uswds";
import "./storybook.css";

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
  decorators: [],
};

export default preview;

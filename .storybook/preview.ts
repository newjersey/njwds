import type { Preview } from "@storybook/web-components-vite";
import { html } from "lit";
import type { StoryFn, StoryContext, Args } from "@storybook/web-components-vite";

// A decorator to wrap stories in a div that applies padding and background color based on theme
const storyWrapperDecorator = <TArgs extends Args>(
  Story: StoryFn<TArgs>,
  context: StoryContext<TArgs>,
) => {
  const className = context.args.theme === "dark" ? "usa-dark-background" : "";

  return html`
    <div class="display-block padding-2 ${className}">${Story(context.args, context)}</div>
  `;
};

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
  decorators: [storyWrapperDecorator],
};

export default preview;

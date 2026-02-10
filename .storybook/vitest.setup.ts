import "@testing-library/jest-dom";

import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import { setProjectAnnotations } from "@storybook/web-components-vite";
import * as projectAnnotations from "./preview";

// Apply Storybook configuration to Vitest
// https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations, projectAnnotations]);

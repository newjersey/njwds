import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Time } from "./Time";
// @ts-expect-error - no types for uswds subpath
import timePicker from "@uswds/uswds/js/usa-time-picker";

const meta = {
  title: "Patterns/Time Picker",
  tags: ["autodocs"],
  render: Time,
  decorators: [
    (story) => {
      useEffect(() => {
        timePicker.init(document.body);
      }, []);

      return story();
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

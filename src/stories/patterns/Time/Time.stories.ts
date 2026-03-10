import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Time } from "./Time";
import timePicker from "@uswds/uswds/js/usa-time-picker";

const meta = {
  title: "Patterns/Time Picker",
  tags: ["autodocs"],
  render: Time,
  decorators: [
    (story) => {
      const result = story();
      setTimeout(() => {
        timePicker.init(document.body); // call timePicker.init() after the story has rendered
      }, 0);
      return result;
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

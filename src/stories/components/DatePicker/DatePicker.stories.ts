import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { DatePicker } from "./DatePicker";
// @ts-expect-error - no types for uswds subpath
import datePicker from "@uswds/uswds/js/usa-date-picker";

const meta = {
  title: "Components/Date Picker",
  tags: ["autodocs"],
  render: DatePicker,
  decorators: [
    (story) => {
      const result = story();
      setTimeout(() => {
        datePicker.init(document.body); // initialize date picker first
      }, 0);
      return result;
    },
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {};

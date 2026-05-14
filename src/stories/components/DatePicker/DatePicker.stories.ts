import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { DatePicker, type DatePickerProps } from "./DatePicker";
// @ts-expect-error - no types for uswds subpath
import datePicker from "@uswds/uswds/js/usa-date-picker";

const meta = {
  title: "Components/Date Picker",
  tags: ["autodocs"],
  render: (args) => DatePicker(args),
  decorators: [
    (story) => {
      useEffect(() => {
        datePicker.init(document.body);
      }, []);

      return story();
    },
  ],
} satisfies Meta<DatePickerProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
  },
};

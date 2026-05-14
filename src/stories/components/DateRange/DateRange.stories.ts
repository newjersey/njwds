import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { useEffect } from "storybook/internal/preview-api";

import { DateRange, type DateRangeProps } from "./DateRange";
// @ts-expect-error - no types for uswds subpath
import datePicker from "@uswds/uswds/js/usa-date-picker";
// @ts-expect-error - no types for uswds subpath
import dateRangePicker from "@uswds/uswds/js/usa-date-range-picker";

const meta = {
  title: "Components/Date Range Picker",
  tags: ["autodocs"],
  render: DateRange,
  decorators: [
    (story) => {
      useEffect(() => {
        datePicker.init(document.body); // initialize date picker first
        dateRangePicker.init(document.body); // then initialize date range picker
      }, []);

      return story();
    },
  ],
} satisfies Meta<DateRangeProps>;

export default meta;
type Story = StoryObj<DateRangeProps>;

export const Default: Story = {
  args: {
    required: false,
  },
};

import type { Meta, StoryObj } from "@storybook/web-components-vite";

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
      const result = story();
      setTimeout(() => {
        datePicker.init(document.body); // initialize date picker first
        dateRangePicker.init(document.body); // then initialize date range picker
      }, 0);
      return result;
    },
  ],
} satisfies Meta<DateRangeProps>;

export default meta;
type Story = StoryObj<DateRangeProps>;

export const Default: Story = {};

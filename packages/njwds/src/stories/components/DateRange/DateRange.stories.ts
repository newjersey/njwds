import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { useEffect } from "storybook/internal/preview-api";

import { DateRange, type DateRangeProps } from "./DateRange";
// @ts-expect-error - no types for uswds subpath
import datePicker from "@uswds/uswds/js/usa-date-picker";
// @ts-expect-error - no types for uswds subpath
import dateRangePicker from "@uswds/uswds/js/usa-date-range-picker";

const meta = {
  title: "Components/Date range picker",
  tags: ["autodocs"],
  render: (args) => {
    // Initialize date picker only once
    useEffect(() => {
      const datePickerElement = document.querySelectorAll(".usa-date-picker");
      if (datePickerElement) {
        datePicker.init(document.body); // initialize date picker first
        dateRangePicker.init(document.body); // then initialize date range picker
      }
    }, []);

    // Apply validation classes when args change
    useEffect(() => {
      const start = document.querySelector("#event-date-start");
      const end = document.querySelector("#event-date-end");

      if (start && end) {
        start.classList.remove("usa-input--error");
        end.classList.remove("usa-input--error");

        if (args.error) {
          start.classList.add("usa-input--error");
          end.classList.add("usa-input--error");
        }
      }
    }, [args.error]);

    return DateRange(args);
  },
} satisfies Meta<DateRangeProps>;

export default meta;
type Story = StoryObj<DateRangeProps>;

export const Default: Story = {
  args: {
    required: false,
    helperText: true,
    error: false,
  },
};

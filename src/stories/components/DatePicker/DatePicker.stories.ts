import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { DatePicker, type DatePickerProps } from "./DatePicker";
// @ts-expect-error - no types for uswds subpath
import datePicker from "@uswds/uswds/js/usa-date-picker";

const meta = {
  title: "Components/Date Picker",
  tags: ["autodocs"],
  render: (args) => {
    // Initialize date picker only once
    useEffect(() => {
      const datePickerElement = document.querySelector(".usa-date-picker");
      if (datePickerElement) {
        datePicker.init(datePickerElement);
      }
    }, []);

    // Apply validation classes when args change
    useEffect(() => {
      const input = document.querySelector("#appointment-date");
      if (input) {
        input.classList.remove("usa-input--error");
        if (args.error) {
          input.classList.add("usa-input--error");
        }
      }
    }, [args.error]);

    return DatePicker(args);
  },
} satisfies Meta<DatePickerProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    required: false,
    helperText: true,
    error: false,
  },
};

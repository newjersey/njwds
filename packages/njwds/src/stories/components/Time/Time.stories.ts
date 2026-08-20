import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { TimePicker, type TimePickerProps } from "./Time";
// @ts-expect-error - no types for uswds subpath
import timePicker from "@uswds/uswds/js/usa-time-picker";

const meta = {
  title: "Components/Time picker",
  tags: ["autodocs"],
  render: (args) => {
    // Initialize time picker only once
    useEffect(() => {
      timePicker.init(document.body);
    }, []);

    // Apply validation classes when args change
    useEffect(() => {
      const input = document.querySelector("#appointment-time");
      if (input) {
        input.classList.remove("usa-input--error");
        if (args.error) {
          input.classList.add("usa-input--error");
        }
      }
    }, [args.error, args.success]);

    return TimePicker(args);
  },
} satisfies Meta<TimePickerProps>;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: "Appointment time",
    required: false,
    helperText: true,
    error: false,
  },
};

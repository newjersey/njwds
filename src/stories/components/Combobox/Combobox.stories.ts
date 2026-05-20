import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { ComboboxComponent, type ComboboxProps } from "./Combobox";
// @ts-expect-error - no types for uswds subpath
import combobox from "@uswds/uswds/js/usa-combo-box";

const meta = {
  title: "Components/Combobox",
  tags: ["autodocs"],
  render: ComboboxComponent,
  decorators: [
    (story) => {
      useEffect(() => {
        combobox.init(document.body);
      }, []);

      return story();
    },
  ],
} satisfies Meta<ComboboxProps>;

export default meta;
type Story = StoryObj<ComboboxProps>;

export const Default: Story = {
  args: {
    label: "Select an option",
    defaultValue: "2",
    required: false,
    error: false,
  },
};

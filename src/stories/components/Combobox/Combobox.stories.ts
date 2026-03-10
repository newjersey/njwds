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
      const result = story();
      setTimeout(() => {
        combobox.init(document.body); // call combobox.init() after the story has rendered
      }, 0);
      return result;
    },
  ],
} satisfies Meta<ComboboxProps>;

export default meta;
type Story = StoryObj<ComboboxProps>;

export const Default: Story = {
  args: {
    label: "Select a fruit",
    defaultValue: "2",
  },
};

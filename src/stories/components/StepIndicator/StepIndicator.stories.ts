import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { StepIndicatorComponent, type StepIndicatorComponentProps } from "./StepIndicator";

const meta = {
  title: "Components/Step indicator",
  tags: ["autodocs"],
  render: (args) => StepIndicatorComponent(args),
} satisfies Meta<StepIndicatorComponentProps>;

export default meta;
type Story = StoryObj<StepIndicatorComponentProps>;

export const Default: Story = {
  args: {
    label: "Supporting documents",
  },
};

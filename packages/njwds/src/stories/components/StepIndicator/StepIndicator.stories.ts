import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { StepIndicatorComponent, type StepIndicatorComponentProps } from "./StepIndicator";

const meta = {
  title: "Components/Step indicator",
  tags: ["autodocs"],
  render: (args) => StepIndicatorComponent(args),
  argTypes: {
    label: {
      if: { arg: "noLabels", truthy: false },
    },
    centered: {
      if: { arg: "noLabels", truthy: false },
    },
    noLabels: {
      if: { arg: "centered", truthy: false },
    },
    smallCounters: {
      if: { arg: "counters", truthy: true },
    },
  },
} satisfies Meta<StepIndicatorComponentProps>;

export default meta;
type Story = StoryObj<StepIndicatorComponentProps>;

export const Default: Story = {
  args: {
    title: "{title}",
    label: "{label}",
    noLabels: false,
    centered: false,
    counters: false,
    smallCounters: false,
  },
};

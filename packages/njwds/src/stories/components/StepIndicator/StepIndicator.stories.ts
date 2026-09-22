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

export const noLabels: Story = {
  args: {
    title: "{title}",
    label: "{label}",
    noLabels: true,
    centered: false,
    counters: false,
    smallCounters: false,
  },
};

export const Centered: Story = {
  args: {
    title: "{title}",
    label: "{label}",
    noLabels: false,
    centered: true,
    counters: false,
    smallCounters: false,
  },
};

export const counters: Story = {
  args: {
    title: "{title}",
    label: "{label}",
    noLabels: false,
    centered: false,
    counters: true,
    smallCounters: false,
  },
};

export const smallCounters: Story = {
  args: {
    title: "{title}",
    label: "{label}",
    noLabels: false,
    centered: false,
    counters: true,
    smallCounters: true,
  },
};

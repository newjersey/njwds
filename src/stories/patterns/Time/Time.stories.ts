import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Time, type TimeProps } from "./Time";

const meta = {
  title: "Patterns/Time",
  tags: ["autodocs"],
  render: (args) => Time(args),
  argTypes: {},
} satisfies Meta<TimeProps>;

export default meta;
type Story = StoryObj<TimeProps>;

export const Default: Story = {};

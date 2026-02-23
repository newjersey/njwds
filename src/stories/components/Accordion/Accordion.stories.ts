import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Accordion, type AccordionProps } from "./Accordion";

const meta = {
  title: "Components/Accordion",
  tags: ["autodocs"],
  render: (args) => Accordion(args),
  argTypes: {
    bordered: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<AccordionProps>;

export default meta;
type Story = StoryObj<AccordionProps>;

export const Default: Story = {
  args: {
    bordered: false,
  },
};

export const Bordered: Story = {
  args: {
    bordered: true,
  },
};

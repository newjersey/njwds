import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Identifier, type IdentifierProps } from "./Identifier";

const meta = {
  title: "Components/Identifier",
  tags: ["autodocs"],
  render: (args) => Identifier(args),
  argTypes: {
    language: {
      control: { type: "select" },
      options: ["English", "Spanish"],
    },
    logos: {
      control: { type: "select" },
      options: ["None", "Single", "Multiple"],
    },
    showTaxpayerDisclaimer: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<IdentifierProps>;

export default meta;
type Story = StoryObj<IdentifierProps>;

export const Default: Story = {
  args: {
    language: "English",
    logos: "Single",
    showTaxpayerDisclaimer: false,
  },
};

export const Spanish: Story = {
  args: {
    language: "Spanish",
    logos: "Single",
    showTaxpayerDisclaimer: false,
  },
};

export const Disclaimer: Story = {
  args: {
    language: "Spanish",
    logos: "Single",
    showTaxpayerDisclaimer: true,
  },
};

export const MultipleLogos: Story = {
  args: {
    language: "Spanish",
    logos: "Multiple",
    showTaxpayerDisclaimer: true,
  },
};

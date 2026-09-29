import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { LanguageSelector, type LanguageSelectorProps } from "./LanguageSelector";

const meta = {
  title: "Components/Language selector",
  tags: ["autodocs"],
  argTypes: {
    pattern: {
      control: { type: "select" },
      options: ["simple", "dropdown"],
      description: "Use a dropdown pattern with 3 or more languages",
    },
    buttonType: {
      control: { type: "select" },
      options: ["secondary", "tertiary"],
    },
    icon: {
      control: { type: "boolean" },
      description: "Show language icon",
    },
  },
  render: (args) => LanguageSelector(args),
} satisfies Meta<LanguageSelectorProps>;

export default meta;
type Story = StoryObj<LanguageSelectorProps>;

export const SimpleToggle: Story = {
  args: {
    pattern: "simple",
    buttonType: "secondary",
    icon: false,
  },
};

export const DropdownMenu: Story = {
  args: {
    pattern: "dropdown",
    buttonType: "secondary",
    icon: false,
  },
};

export const WithIcon: Story = {
  args: {
    pattern: "simple",
    buttonType: "secondary",
    icon: true,
  },
};

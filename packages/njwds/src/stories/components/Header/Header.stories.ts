import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Header, type HeaderProps } from "./Header";

const meta = {
  title: "Components/Header",
  tags: ["autodocs"],
  render: (args, context) =>
    Header({
      ...args,
      toggleValue: context.viewMode === "docs" ? undefined : context.id,
    }),
  argTypes: {
    variant: {
      control: { type: "select" },
      options: ["Default", "Extended"],
    },
    languageSelector: {
      control: { type: "select" },
      options: [undefined, "navigation", "above-search"],
    },
  },
} satisfies Meta<HeaderProps>;

export default meta;
type Story = StoryObj<HeaderProps>;

export const Default: Story = {
  args: {
    megamenu: false,
    variant: "Default",
  },
};

export const Megamenu: Story = {
  args: {
    megamenu: true,
    variant: "Default",
  },
};

export const Extended: Story = {
  args: {
    megamenu: false,
    variant: "Extended",
  },
};

export const WithLanguageSelector: Story = {
  args: {
    languageSelector: "navigation",
    megamenu: false,
    variant: "Default",
  },
};

export const WithLanguageSelectorAboveSearch: Story = {
  args: {
    languageSelector: "above-search",
    megamenu: false,
    variant: "Default",
  },
};

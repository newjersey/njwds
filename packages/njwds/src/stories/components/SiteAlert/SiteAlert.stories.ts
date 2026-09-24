import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { SiteAlert, type SiteAlertProps } from "./SiteAlert";

const meta = {
  title: "Components/Site alert",
  tags: ["autodocs"],
  render: (args) => {
    if (args.slim) {
      args.header = false;
      args.list = false;
    }
    return SiteAlert(args);
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "emergency"],
    },
    slim: {
      control: { type: "boolean" },
    },
    header: {
      control: { type: "boolean" },
      if: { arg: "slim", truthy: false },
    },
    icon: {
      control: { type: "boolean" },
    },
    list: {
      control: { type: "boolean" },
      if: { arg: "slim", truthy: false },
    },
  },
} satisfies Meta<SiteAlertProps>;

export default meta;
type Story = StoryObj<SiteAlertProps>;

export const Info: Story = {
  args: {
    heading: "Informative status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "info",
    slim: false,
    header: true,
    icon: true,
    list: false,
  },
};

export const Emergency: Story = {
  args: {
    heading: "Emergency status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "emergency",
    slim: false,
    header: true,
    icon: true,
    list: false,
  },
};

export const NoHeading: Story = {
  args: {
    heading: "Emergency status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "emergency",
    slim: false,
    header: false,
    icon: true,
    list: false,
  },
};

export const WithList: Story = {
  args: {
    heading: "Emergency status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "emergency",
    slim: false,
    header: true,
    icon: true,
    list: true,
  },
};

export const Slim: Story = {
  args: {
    heading: "Emergency status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "emergency",
    slim: true,
    header: false,
    icon: true,
    list: false,
  },
};

export const NoIcon: Story = {
  args: {
    heading: "Emergency status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "emergency",
    slim: false,
    header: false,
    icon: false,
    list: false,
  },
};

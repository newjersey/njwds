import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";

import { Alert, type AlertProps } from "./Alert";

const dismissAlert = (event: MouseEvent) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const closeButton = target.closest("[data-close-alert]");
  if (!closeButton) return;

  const alert = closeButton.closest(".usa-alert");
  if (!alert) return;

  const parent = alert.parentElement;
  alert.remove();

  if (parent instanceof HTMLElement) {
    parent.tabIndex = -1;
    parent.focus();
  }
};

const meta = {
  title: "Components/Alert",
  tags: ["autodocs"],
  render: (args) => {
    // When slim is true, force header to false
    if (args.slim) {
      args.header = false;
    }
    return Alert(args);
  },
  decorators: [
    (story) => {
      useEffect(() => {
        if (document.body.dataset.dismissableAlertsInit) return;
        document.body.dataset.dismissableAlertsInit = "true";

        document.body.addEventListener("click", dismissAlert);
      }, []);

      return story();
    },
  ],
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["info", "success", "warning", "error"],
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
    dismissable: {
      control: { type: "boolean" },
    },
  },
} satisfies Meta<AlertProps>;

export default meta;
type Story = StoryObj<AlertProps>;

export const Info: Story = {
  args: {
    heading: "Informative status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "info",
    slim: false,
    icon: false,
    header: true,
    dismissable: false,
  },
};

export const Success: Story = {
  args: {
    heading: "Success status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "success",
    slim: false,
    icon: false,
    header: true,
    dismissable: false,
  },
};

export const Warning: Story = {
  args: {
    heading: "Warning status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "warning",
    slim: false,
    icon: false,
    header: true,
    dismissable: false,
  },
};

export const Error: Story = {
  args: {
    heading: "Error status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "error",
    slim: false,
    icon: false,
    header: true,
    dismissable: false,
  },
};

export const Slim: Story = {
  args: {
    heading: "Informative status",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    type: "info",
    slim: true,
    icon: false,
    header: true,
    dismissable: false,
  },
};

export const Dismissable: Story = {
  args: {
    heading: "Success status",
    text: "You saved your document.",
    type: "success",
    slim: false,
    icon: true,
    header: false,
    dismissable: true,
  },
};

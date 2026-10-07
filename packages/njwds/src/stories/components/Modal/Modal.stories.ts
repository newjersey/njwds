import { useEffect } from "storybook/internal/preview-api";
import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Modal, type ModalProps } from "./Modal";
import { getStoryModalId } from "../../../utils/storyModalId";
// @ts-expect-error - no types for uswds subpath
import modal from "@uswds/uswds/js/usa-modal";

const meta = {
  title: "Components/Modal",
  tags: ["autodocs"],
  render: (args, context) => {
    return Modal({
      ...args,
      modalId: getStoryModalId(context.canvasElement),
    });
  },
  decorators: [
    (story) => {
      useEffect(() => {
        // Storybook's docs page renders the same story into more than one
        // canvas (a "primary" block plus a "stories" list block), but this
        // effect only fires once per story, not once per canvas. Scan for
        // every not-yet-initialized modal - rather than looking up a single
        // element by id - so every canvas gets wired up regardless of how
        // many canvases share this one effect firing.
        document.querySelectorAll(".usa-modal").forEach((modalElement) => {
          if (!modalElement.closest(".usa-modal-wrapper")) {
            modal.init(modalElement.parentElement ?? document.body);
          }
        });
      }, []);

      return story();
    },
  ],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["small", "large"],
    },
  },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj<ModalProps>;

export const Default: Story = {
  args: {
    size: "small",
    forceAction: false,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    forceAction: false,
  },
};

export const forceAction: Story = {
  args: {
    size: "large",
    forceAction: true,
  },
};

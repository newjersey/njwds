import type { Meta, StoryObj } from "@storybook/web-components-vite";
import { Modal, type ModalProps } from "./Modal";
// @ts-expect-error - no types for uswds subpath
import modal from "@uswds/uswds/js/usa-modal";

const meta = {
  title: "Components/Modal",
  tags: ["autodocs"],
  render: (args, context) => {
    // Always use stable ID based on story name to avoid conflicts
    const storyId = `modal-${context.name.toLowerCase().replace(/\s+/g, "-")}`;
    return Modal({
      ...args,
      modalId: storyId,
    });
  },
  decorators: [
    (story, context) => {
      const result = story();
      setTimeout(() => {
        const storyId = `modal-${context.name.toLowerCase().replace(/\s+/g, "-")}`;

        // Check if this specific modal already has a wrapper (already initialized)
        const existingWrapper = document.getElementById(storyId);

        if (existingWrapper && existingWrapper.classList.contains("usa-modal-wrapper")) {
          // Already initialized, don't reinit
          return;
        }

        // Find the newly rendered modal element (not yet wrapped)
        const newModal = document.getElementById(storyId);
        if (newModal && newModal.classList.contains("usa-modal")) {
          // This modal needs initialization
          modal.init(newModal.parentElement || document.body);
        }
      }, 0);
      return result;
    },
  ],
  argTypes: {
    size: {
      control: { type: "select" },
      options: ["default", "large"],
    },
  },
} satisfies Meta<ModalProps>;

export default meta;
type Story = StoryObj<ModalProps>;

export const Default: Story = {
  args: {
    size: "default",
    forceAction: false,
  },
};

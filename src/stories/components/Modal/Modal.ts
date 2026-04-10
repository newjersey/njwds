import { html } from "lit";

export interface ModalProps {
  size: "default" | "large";
  forceAction: boolean;
  modalId?: string;
}

export const Modal = ({ size, forceAction, modalId }: ModalProps) => {
  // Use provided ID or generate unique ID to avoid conflicts in Storybook
  const id = modalId || `modal-${crypto.randomUUID()}`;

  const modalClasses = ["usa-modal", size === "large" && "usa-modal--lg"].filter(Boolean).join(" ");

  // Choose content based on forceAction
  const heading = forceAction
    ? "Your session will end soon."
    : "Are you sure you want to continue?";

  const description = forceAction
    ? "You've been inactive for too long. Please choose to stay signed in or sign out. Otherwise, you'll be signed out automatically in 5 minutes."
    : "You have unsaved changes that will be lost.";

  const primaryButtonText = forceAction ? "Yes, stay signed in" : "Continue without saving";

  const secondaryButtonText = forceAction ? "Sign out" : "Go back";

  return html`
    <div class="padding-1">
      <button class="usa-button" aria-controls="${id}" data-open-modal>
        ${forceAction ? "Open modal with forced action" : "Open default modal"}
      </button>
      <div
        class="${modalClasses}"
        id="${id}"
        aria-labelledby="${id}-heading"
        aria-describedby="${id}-description"
        ?data-force-action=${forceAction}
      >
        <div class="usa-modal__content">
          <div class="usa-modal__main">
            <h1 class="usa-modal__heading" id="${id}-heading">${heading}</h1>
            <div class="usa-prose">
              <p id="${id}-description">${description}</p>
            </div>
            <div class="usa-modal__footer">
              <ul class="usa-button-group">
                <li class="usa-button-group__item">
                  <button type="button" class="usa-button" data-close-modal>
                    ${primaryButtonText}
                  </button>
                </li>
                <li class="usa-button-group__item">
                  <button
                    type="button"
                    class="usa-button usa-button--unstyled padding-105 text-center"
                    data-close-modal
                  >
                    ${secondaryButtonText}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          ${!forceAction
            ? html`
                <button
                  type="button"
                  class="usa-button usa-modal__close"
                  aria-label="Close this window"
                  data-close-modal
                >
                  <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
                    <use href="./img/sprite.svg#close"></use>
                  </svg>
                </button>
              `
            : null}
        </div>
      </div>
    </div>
  `;
};

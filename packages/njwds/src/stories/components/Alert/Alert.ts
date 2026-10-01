import { html } from "lit";

export interface AlertProps {
  heading: string;
  text: string;
  type: string;
  header: boolean;
  slim: boolean;
  icon: boolean;
  dismissible: boolean;
}

export const Alert = ({ heading, text, type, header, slim, icon, dismissible }: AlertProps) => {
  // When slim is true, header must be false
  const showHeader = slim ? false : header;

  return html`<div
    class=${[
      "usa-alert",
      type !== "default" && `usa-alert--${type}`,
      slim && "usa-alert--slim",
      !icon && "usa-alert--no-icon",
      dismissible && "usa-alert--dismissible",
    ]
      .filter(Boolean)
      .join(" ")}
    role="alert"
  >
    <div class="usa-alert__body">
      ${showHeader ? html` <h3 class="usa-alert__heading">${heading}</h3> ` : null}

      <p class="usa-alert__text">${text}</p>

      ${
        dismissible
          ? html`
              <button
                type="button"
                class="usa-alert__close"
                aria-label="Close this alert"
                data-close-alert
              >
                <svg
                  class="usa-icon usa-icon--size-3"
                  aria-hidden="true"
                  focusable="false"
                  role="img"
                >
                  <use href="./img/sprite.svg#close"></use>
                </svg>
              </button>
            `
          : null
      }
    </div>
  </div>`;
};

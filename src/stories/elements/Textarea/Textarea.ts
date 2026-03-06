import { html } from "lit";

export interface TextareaProps {
  label: string;
  error: boolean;
  success: boolean;
}

export const Textarea = ({ label, error, success }: TextareaProps) => {
  const classes = error ? "usa-input--error" : success ? "usa-input--success" : "";

  return html`
    <form class="usa-form">
      <label class="usa-label" for="input-type-text">${label}</label>
      <textarea
        class="usa-textarea ${classes}"
        id="input-type-text"
        name="input-type-text"
      ></textarea>

      ${error
        ? html` <div class="nj-error-message-container">
            <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
              <use xlink:href="../../public/dist/img/sprite.svg#error"></use>
            </svg>
            <span class="usa-error-message" id="input-error-message" role="alert"
              >Helpful error message</span
            >
          </div>`
        : ""}
    </form>
  `;
};

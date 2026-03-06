import { html } from "lit";

export interface TextareaProps {
  label: string;
  error: boolean;
  success: boolean;
  required: boolean;
  helperText: boolean;
}

export const Textarea = ({ label, error, success, required, helperText }: TextareaProps) => {
  const classes = error ? "usa-input--error" : success ? "usa-input--success" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form">
      <label class="usa-label ${classesLabel}" for="input-type-text">
        ${label} ${requiredHtml}
      </label>
      ${helperText ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>` : ""}
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

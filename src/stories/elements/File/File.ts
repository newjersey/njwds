import { html } from "lit";

export interface FileProps {
  label: string;
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const File = ({ label, error, required, helperText }: FileProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error" : "";

  return html`
    <form class="usa-form ${errorFormClass}">
      <label class="usa-label ${errorLabelClass}" for="file-html">
        ${label}
        ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
      </label>
      ${helperText
        ? html`<div id="with-hint-input-hint" class="usa-hint">Example: document.pdf</div>`
        : ""}
      <input
        class="usa-input ${errorInputClass}"
        id="file-html"
        name="input-type-file"
        type="file"
      />

      ${error
        ? html` <div class="nj-error-message-container">
            <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
              <use xlink:href="./public/dist/img/sprite.svg#error"></use>
            </svg>
            <span class="usa-error-message" id="input-error-message" role="alert"
              >Helpful error message</span
            >
          </div>`
        : ""}
    </form>
  `;
};

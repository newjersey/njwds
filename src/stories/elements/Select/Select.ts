import { html } from "lit";

export interface SelectProps {
  label: string;
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const Select = ({ label, error, required, helperText }: SelectProps) => {
  const errorGroupClass = error ? "usa-form-group--error" : "";
  const errorLabelClass = error ? "usa-label--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form ${errorGroupClass}">
      <label class="usa-label ${errorLabelClass}" for="options">${label} ${requiredHtml}</label>
      ${helperText ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>` : ""}
      <select class="usa-select ${errorInputClass}" name="options" id="options">
        <option value="" selected disabled>Choose an option</option>
        <option value="value1">Option A</option>
        <option value="value2">Option B</option>
        <option value="value3">Option C</option>
      </select>

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

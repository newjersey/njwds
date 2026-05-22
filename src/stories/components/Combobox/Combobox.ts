import { html } from "lit";

export interface ComboboxProps {
  label: string;
  defaultValue: string;
  required: boolean;
  error: boolean;
  helperText: boolean;
}

export const ComboboxComponent = ({
  label,
  defaultValue,
  required,
  error,
  helperText,
}: ComboboxProps) => {
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form ${error ? "usa-form-group--error" : ""}">
      <label class="usa-label ${error ? "usa-label--error" : ""}" for="nj-options"
        >${label} ${requiredHtml}</label
      >
      ${helperText ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>` : ""}
      <div class="usa-combo-box" data-default-value="${defaultValue}">
        <select class="usa-select" name="options" id="nj-options">
          <option value="" disabled>Select an option</option>
          <option value="1">Option 1</option>
          <option value="${defaultValue}">Option 2</option>
          <option value="3">Option 3</option>
          <option value="4">Option 4</option>
        </select>
      </div>
      ${error
        ? html` <div class="nj-error-message-container">
            <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
              <use xlink:href="./public/dist/img/sprite.svg#error"></use>
            </svg>
            <span class="usa-error-message" id="nj-input-error-message" role="alert"
              >Helpful error message</span
            >
          </div>`
        : ""}
    </form>
  `;
};

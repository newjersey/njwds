import { html } from "lit";

export interface RangeProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  required: boolean;
  helperText: boolean;
  error: boolean;
}

export const Range = ({
  label,
  min,
  max,
  step,
  value,
  required,
  helperText,
  error,
}: RangeProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error" : "";

  return html`
    <form class="usa-form ${errorFormClass}">
      <label class="usa-label ${errorLabelClass}" for="range-slider">
        ${label}
        ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
      </label>
      ${helperText ? html`<div id="with-hint-range-hint" class="usa-hint">Example: 50</div>` : ""}
      <input
        id="range-slider"
        class="usa-range ${errorInputClass}"
        type="range"
        min="${min}"
        max="${max}"
        step="${step}"
        value="${value}"
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

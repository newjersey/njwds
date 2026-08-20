import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

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

  return html`
    <div class="grid-container">
      <form class="usa-form ${errorGroupClass}">
        <label class="usa-label ${errorLabelClass}" for="options"
          >${label} ${renderRequired(required)}</label
        >
        ${helperText ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>` : ""}
        <select class="usa-select ${errorInputClass}" name="options" id="options">
          <option value="" selected disabled>Choose an option</option>
          <option value="value1">Option A</option>
          <option value="value2">Option B</option>
          <option value="value3">Option C</option>
        </select>

        ${error ? renderErrorMessage("input-error-message", "Helpful error message") : ""}
      </form>
    </div>
  `;
};

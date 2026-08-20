import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface InputProps {
  label: string;
  error: boolean;
  required: boolean;
  helperText: boolean;
  width: string;
}

export const Input = ({ label, error, required, helperText, width }: InputProps) => {
  const inputClasses = error ? "usa-input--error" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";
  const widthClass = `usa-input--${width}`;

  return html`
    <div class="grid-container">
      <form class="usa-form maxw-none ${errorGroupClass}">
        <label class="usa-label ${classesLabel}" for="input-type-text">
          ${label} ${renderRequired(required)}
        </label>
        ${helperText ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input ${inputClasses} ${widthClass}"
          id="input-type-text"
          name="input-type-text"
          type="text"
        />

        ${error ? renderErrorMessage("input-error-message", "Helpful error message") : ""}
      </form>
    </div>
  `;
};

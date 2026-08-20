import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface DatePickerProps {
  required: boolean;
  error: boolean;
  helperText: boolean;
}

export const DatePicker = ({ required, error, helperText }: DatePickerProps) => {
  const classes = error ? "usa-input--error" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";

  return html`
    <form class="usa-form ${errorGroupClass}">
      <div class="usa-form-group">
        <label class="usa-label ${classesLabel}" id="appointment-date-label" for="appointment-date"
          >Appointment date ${renderRequired(required)}</label
        >
        ${helperText ? html`<div id="appointment-date-hint" class="usa-hint">mm/dd/yyyy</div>` : ""}

        <div class="usa-date-picker">
          <input
            class="usa-input ${classes}"
            id="appointment-date"
            name="appointment-date"
            type="text"
            aria-describedby="appointment-date-label appointment-date-hint"
          />
        </div>

        ${error ? renderErrorMessage("input-error-message", "Helpful error message") : ""}
      </div>
    </form>
  `;
};

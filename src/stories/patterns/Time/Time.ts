import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface TimePickerProps {
  required: boolean;
  error: boolean;
  label: string;
  success: boolean;
  helperText: boolean;
}

export const TimePicker = ({ required, error, label, helperText }: TimePickerProps) => {
  const classes = error ? "usa-input--error" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";

  return html`
    <form class="usa-form">
      <div class="usa-form-group ${errorGroupClass}">
        <label class="usa-label" id="appointment-time-label" for="appointment-time"
          >${label} ${renderRequired(required)}</label
        >
        ${helperText ? html`<div id="appointment-time-hint" class="usa-hint">hh:mm</div>` : ""}
        <div class="usa-time-picker">
          <input
            class="usa-input ${classes}"
            id="appointment-time"
            name="appointment-time"
            type="text"
            aria-describedby="appointment-time-label appointment-time-hint"
          />
        </div>
        ${error ? renderErrorMessage("group-error-message", "Helpful error message") : ""}
      </div>
    </form>
  `;
};

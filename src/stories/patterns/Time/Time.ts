import { html } from "lit";

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

  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form">
      <div class="usa-form-group ${errorGroupClass}">
        <label class="usa-label" id="appointment-time-label" for="appointment-time"
          >${label} ${requiredHtml}</label
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
        ${error
          ? html` <div class="nj-error-message-container">
              <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
                <use xlink:href="./img/sprite.svg#error"></use>
              </svg>
              <span class="usa-error-message" id="group-error-message" role="alert"
                >Helpful error message</span
              >
            </div>`
          : ""}
      </div>
    </form>
  `;
};

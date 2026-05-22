import { html } from "lit";

export interface DatePickerProps {
  required: boolean;
  error: boolean;
  success: boolean;
}

export const DatePicker = ({ required, error, success }: DatePickerProps) => {
  const classes = error ? "usa-input--error" : success ? "usa-input--success" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form ${errorGroupClass}">
      <div class="usa-form-group">
        <label class="usa-label ${classesLabel}" id="appointment-date-label" for="appointment-date"
          >Appointment date ${requiredHtml}</label
        >
        <div class="usa-hint" id="appointment-date-hint">mm/dd/yyyy</div>

        <div class="usa-date-picker">
          <input
            class="usa-input ${classes}"
            id="appointment-date"
            name="appointment-date"
            type="text"
            aria-describedby="appointment-date-label appointment-date-hint"
          />
        </div>

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
      </div>
    </form>
  `;
};

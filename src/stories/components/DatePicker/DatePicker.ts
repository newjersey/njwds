import { html } from "lit";

export interface DatePickerProps {
  required: boolean;
}

export const DatePicker = ({ required }: DatePickerProps) => {
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form">
      <div class="usa-form-group">
        <label class="usa-label" id="appointment-date-label" for="appointment-date"
          >Appointment date ${requiredHtml}</label
        >
        <div class="usa-hint" id="appointment-date-hint">mm/dd/yyyy</div>

        <div class="usa-date-picker">
          <input
            class="usa-input"
            id="appointment-date"
            name="appointment-date"
            type="text"
            aria-describedby="appointment-date-label appointment-date-hint"
          />
        </div>
      </div>
    </form>
  `;
};

import { html } from "lit";

export interface DateRangeProps {
  class?: string;
  required: boolean;
}

export const DateRange = ({ class: className, required }: DateRangeProps) => {
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form ${className}">
      <div class="usa-date-range-picker">
        <div class="usa-form-group">
          <label class="usa-label" id="event-date-start-label" for="event-date-start"
            >Event start date ${requiredHtml}</label
          >
          <div class="usa-hint" id="event-date-start-hint">mm/dd/yyyy</div>
          <div class="usa-date-picker">
            <input
              class="usa-input"
              id="event-date-start"
              name="event-date-start"
              type="text"
              aria-describedby="event-date-start-label event-date-start-hint"
            />
          </div>
        </div>

        <div class="usa-form-group">
          <label class="usa-label" id="event-date-end-label" for="event-date-end"
            >Event end date ${requiredHtml}</label
          >
          <div class="usa-hint" id="event-date-end-hint">mm/dd/yyyy</div>
          <div class="usa-date-picker">
            <input
              class="usa-input"
              id="event-date-end"
              name="event-date-end"
              type="text"
              aria-describedby="event-date-end-label event-date-end-hint"
            />
          </div>
        </div>
      </div>
    </form>
  `;
};

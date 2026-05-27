import { html } from "lit";

export interface DateRangeProps {
  class: string;
  required: boolean;
  helperText: boolean;
  error: boolean;
}

export const DateRange = ({ class: className, required, helperText, error }: DateRangeProps) => {
  const classes = error ? "usa-input--error" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";

  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form ${className} ${errorGroupClass}">
      <div class="usa-date-range-picker">
        <div class="usa-form-group">
          <label
            class="usa-label ${classesLabel}"
            id="event-date-start-label"
            for="event-date-start"
            >Event start date ${requiredHtml}</label
          >
          ${helperText
            ? html`<div id="event-date-start-hint" class="usa-hint">mm/dd/yyyy</div>`
            : ""}
          <div class="usa-date-picker">
            <input
              class="usa-input ${classes}"
              id="event-date-start"
              name="event-date-start"
              type="text"
              aria-describedby="event-date-start-label event-date-start-hint input-error-message"
            />
          </div>

          ${error
            ? html` <div class="nj-error-message-container">
                <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
                  <use xlink:href="./img/sprite.svg#error"></use>
                </svg>
                <span class="usa-error-message" id="input-error-message" role="alert"
                  >Helpful error message</span
                >
              </div>`
            : ""}
        </div>

        <div class="usa-form-group">
          <label class="usa-label ${classesLabel}" id="event-date-end-label" for="event-date-end"
            >Event end date ${requiredHtml}</label
          >
          ${helperText ? html`<div id="event-date-end-hint" class="usa-hint">mm/dd/yyyy</div>` : ""}
          <div class="usa-date-picker">
            <input
              class="usa-input ${classes}"
              id="event-date-end"
              name="event-date-end"
              type="text"
              aria-describedby="event-date-end-label event-date-end-hint input2-error-message"
            />
          </div>
        </div>
        ${error
          ? html` <div class="nj-error-message-container">
              <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
                <use xlink:href="./img/sprite.svg#error"></use>
              </svg>
              <span class="usa-error-message" id="input2-error-message" role="alert"
                >Helpful error message</span
              >
            </div>`
          : ""}
      </div>
    </form>
  `;
};

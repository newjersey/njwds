import { html } from "lit";

export interface DateProps {
  required: boolean;
  error: boolean;
  success: boolean;
  helperText: boolean;
}

export const Date = ({ required, error, success, helperText }: DateProps) => {
  const classes = error ? "usa-input--error" : success ? "usa-input--success" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";

  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form maxw-none ${errorGroupClass}">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Date of birth ${requiredHtml}</legend>
        ${helperText
          ? html`<div id="with-hint-input-hint" class="usa-hint">Example: April 28 1986</div>`
          : ""}
        <div class="usa-memorable-date">
          <div class="usa-form-group usa-form-group--month">
            <label class="usa-label" for="month">Month</label>
            <select
              class="usa-select ${classes}"
              name="options"
              id="month"
              aria-describedby="dobHint"
            >
              <option value="" selected disabled>Choose an option</option>
              <option value="value1">January</option>
              <option value="value2">February</option>
              <option value="value3">March</option>
              <option value="value4">April</option>
              <option value="value5">May</option>
              <option value="value6">June</option>
              <option value="value7">July</option>
              <option value="value8">August</option>
              <option value="value9">September</option>
              <option value="value10">October</option>
              <option value="value11">November</option>
              <option value="value12">December</option>
            </select>
          </div>
          <div class="usa-form-group usa-form-group--day">
            <label class="usa-label" for="date_of_birth_2">Day</label>
            <input
              class="usa-input usa-input--inline ${classes}"
              aria-describedby="dobHint"
              id="date_of_birth_2"
              name="date_of_birth_2"
              type="text"
              maxlength="2"
              pattern="[0-9]*"
              inputmode="numeric"
              value=""
            />
          </div>
          <div class="usa-form-group usa-form-group--year">
            <label class="usa-label" for="date_of_birth_3">Year</label>
            <input
              class="usa-input usa-input--inline ${classes}"
              aria-describedby="dobHint"
              id="date_of_birth_3"
              name="date_of_birth_3"
              type="text"
              minlength="4"
              maxlength="4"
              pattern="[0-9]*"
              inputmode="numeric"
              value=""
            />
          </div>
        </div>
        ${error
          ? html` <div class="nj-error-message-container">
              <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
                <use xlink:href="./public/dist/img/sprite.svg#error"></use>
              </svg>
              <span class="usa-error-message" id="group-error-message" role="alert"
                >Helpful error message</span
              >
            </div>`
          : ""}
      </fieldset>
    </form>
  `;
};

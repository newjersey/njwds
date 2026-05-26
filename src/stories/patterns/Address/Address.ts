import { html } from "lit";

export interface AddressProps {
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const Address = ({ error, required, helperText }: AddressProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error margin-top-3" : "";

  return html`
    <form class="usa-form usa-form--large ${errorFormClass}">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Mailing address</legend>
        <label class="usa-label ${errorLabelClass}" for="mailing-address-1">
          Street address 1
          ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
        </label>
        ${helperText ? html`<div id="hint-street" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input ${errorInputClass}"
          id="mailing-address-1"
          name="mailing-address-1"
          type="text"
        />

        <label class="usa-label ${errorLabelClass}" for="mailing-address-2">
          Street address 2
          ${required
            ? html`<abbr title="required" class="usa-label--required">*</abbr>`
            : html`<span class="usa-hint">(optional)</span>`}
        </label>
        ${helperText ? html`<div id="hint-street-2" class="usa-hint">Helper text</div>` : ""}

        <input
          class="usa-input ${errorInputClass}"
          id="mailing-address-2"
          name="mailing-address-2"
          type="text"
        />

        <div class="grid-row grid-gap">
          <div class="mobile-lg:grid-col-8">
            <label class="usa-label ${errorLabelClass}" for="city">
              City
              ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
            </label>
            ${helperText ? html`<div id="hint-city" class="usa-hint">Helper text</div>` : ""}
            <input class="usa-input ${errorInputClass}" id="city" name="city" type="text" />
          </div>
          <div class="mobile-lg:grid-col-4">
            <label class="usa-label ${errorLabelClass}" for="state">
              State
              ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
            </label>
            ${helperText ? html`<div id="hint-state" class="usa-hint">NJ</div>` : ""}
            <select class="usa-select ${errorInputClass}" id="state" name="state">
              <option value>- Select -</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
            </select>
          </div>
        </div>

        <label class="usa-label ${errorLabelClass}" for="zip">
          ZIP ${required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : ""}
        </label>
        ${helperText ? html`<div id="hint-street" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input usa-input--medium ${errorInputClass}"
          id="zip"
          name="zip"
          type="text"
          pattern="[d]{5}(-[d]{4})?"
        />
      </fieldset>
    </form>
  `;
};

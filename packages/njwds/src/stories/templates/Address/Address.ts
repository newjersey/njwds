import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface AddressProps {
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const Address = ({ error, required, helperText }: AddressProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error margin-top-3" : "";

  // Helper to create aria-describedby values conditionally
  const errorAriaDescribedBy = (errorId: string) => ifDefined(error ? errorId : undefined);

  return html`
    <form class="usa-form usa-form--large ${errorFormClass}">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend font-heading-xl text-bold">Mailing address</legend>
        <label class="usa-label ${errorLabelClass}" for="mailing-address-1">
          Street address 1 ${renderRequired(required)}
        </label>
        ${helperText ? html`<div id="hint-street" class="usa-hint">Helper text</div>` : ""}
        <input
          aria-describedby=${errorAriaDescribedBy("input-error-1")}
          class="usa-input ${errorInputClass}"
          id="mailing-address-1"
          name="mailing-address-1"
          type="text"
        />

        ${error ? renderErrorMessage("input-error-1", "Helpful error message") : ""}

        <label class="usa-label ${errorLabelClass}" for="mailing-address-2">
          Street address 2
          ${required ? renderRequired(required) : html`<span class="usa-hint">(optional)</span>`}
        </label>
        ${helperText ? html`<div id="hint-street-2" class="usa-hint">Helper text</div>` : ""}

        <input
          aria-describedby=${errorAriaDescribedBy("input-error-2")}
          class="usa-input ${errorInputClass}"
          id="mailing-address-2"
          name="mailing-address-2"
          type="text"
        />

        ${error ? renderErrorMessage("input-error-2", "Helpful error message") : ""}

        <div class="grid-row grid-gap">
          <div class="mobile-lg:grid-col-8">
            <label class="usa-label ${errorLabelClass}" for="city">
              City ${renderRequired(required)}
            </label>
            ${helperText ? html`<div id="hint-city" class="usa-hint">Helper text</div>` : ""}
            <input
              aria-describedby=${errorAriaDescribedBy("input-error-3")}
              class="usa-input ${errorInputClass}"
              id="city"
              name="city"
              type="text"
            />

            ${error ? renderErrorMessage("input-error-3", "Helpful error message") : ""}
          </div>
          <div class="mobile-lg:grid-col-4">
            <label class="usa-label ${errorLabelClass}" for="state">
              State ${renderRequired(required)}
            </label>
            ${helperText ? html`<div id="hint-state" class="usa-hint">NJ</div>` : ""}
            <select
              aria-describedby=${errorAriaDescribedBy("input-error-4")}
              class="usa-select ${errorInputClass}"
              id="state"
              name="state"
            >
              <option value>- Select -</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
            </select>

            ${error ? renderErrorMessage("input-error-4", "Helpful error message") : ""}
          </div>
        </div>

        <label class="usa-label ${errorLabelClass}" for="zip">
          ZIP ${renderRequired(required)}
        </label>
        ${helperText ? html`<div id="hint-street" class="usa-hint">Helper text</div>` : ""}
        <input
          aria-describedby=${errorAriaDescribedBy("input-error-5")}
          class="usa-input usa-input--medium ${errorInputClass}"
          id="zip"
          name="zip"
          type="text"
          pattern="[0-9]{5}(-[0-9]{4})?"
        />

        ${error ? renderErrorMessage("input-error-5", "Helpful error message") : ""}
      </fieldset>
    </form>
  `;
};

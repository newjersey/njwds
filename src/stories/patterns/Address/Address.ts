import { html } from "lit";

export const Address = () => {
  return html`
    <form class="usa-form usa-form--large">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Mailing address</legend>
        <label class="usa-label" for="mailing-address-1">Street address 1</label>
        <input class="usa-input" id="mailing-address-1" name="mailing-address-1" type="text" />

        <label class="usa-label" for="mailing-address-2"
          >Street address 2 <span class="usa-hint">(optional)</span></label
        >
        <input class="usa-input" id="mailing-address-2" name="mailing-address-2" type="text" />

        <div class="grid-row grid-gap">
          <div class="mobile-lg:grid-col-8">
            <label class="usa-label" for="city">City</label>
            <input class="usa-input" id="city" name="city" type="text" />
          </div>
          <div class="mobile-lg:grid-col-4">
            <label class="usa-label" for="state">State</label>
            <select class="usa-select" id="state" name="state">
              <option value>- Select -</option>
              <option value="AL">Alabama</option>
              <option value="AK">Alaska</option>
              <option value="AZ">Arizona</option>
              <option value="AR">Arkansas</option>
            </select>
          </div>
        </div>

        <label class="usa-label" for="zip">ZIP</label>
        <input
          class="usa-input usa-input--medium"
          id="zip"
          name="zip"
          type="text"
          pattern="[d]{5}(-[d]{4})?"
        />
      </fieldset>
    </form>
  `;
};

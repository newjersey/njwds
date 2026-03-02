import { html } from "lit";

export interface CheckboxProps {
  tile: boolean;
  label: string;
}

export const Checkbox = ({ tile = false, label }: CheckboxProps) => {
  const content = html`
    <form class="usa-form">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Select any historical figure</legend>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="check-historical-truth"
            type="checkbox"
            name="radio-group"
            value="sojourner-truth"
            checked
          />
          <label class="usa-checkbox__label" for="check-historical-truth">${label}</label>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="check-historical-douglass"
            type="checkbox"
            name="radio-group"
            value="frederick-douglass"
          />
          <label class="usa-checkbox__label" for="check-historical-douglass">${label}</label>
        </div>
        <div class="usa-checkbox">
          <input
            class="usa-checkbox__input"
            id="check-historical-washington"
            type="checkbox"
            name="radio-group"
            value="booker-t-washington"
          />
          <label class="usa-checkbox__label" for="check-historical-washington">${label}</label>
        </div>
      </fieldset>
    </form>
  `;

  return tile === false
    ? html`<form class="usa-form">${content}</form>`
    : html`<form class="usa-form">${content}</form>`;
};

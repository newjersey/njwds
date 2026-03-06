import { html } from "lit";

export interface RadioProps {
  tile: boolean;
  label: string;
}

export const Radio = ({ tile = false, label }: RadioProps) => {
  const instanceId = `${crypto.randomUUID()}`; // for storybook, to ensure unique ids for each radio instance
  const classes = tile ? "usa-radio__input usa-radio__input--tile" : "usa-radio__input";
  const tileLabel = tile
    ? html`<span class="usa-radio__label-description"
        >This is optional text that can be used to describe the label in moredetail.</span
      >`
    : "";

  const content = html`
    <div class="usa-radio">
      <input
        class="${classes}"
        id="radio1-${instanceId}"
        type="radio"
        name="radio-group"
        value="radio1"
        checked
      />
      <label class="usa-radio__label" for="radio1-${instanceId}">${label}</label>
    </div>
    <div class="usa-radio">
      <input
        class="${classes}"
        id="radio2-${instanceId}"
        type="radio"
        name="radio-group"
        value="radio2"
      />
      <label class="usa-radio__label" for="radio2-${instanceId}">${label} ${tileLabel}</label>
    </div>
    <div class="usa-radio">
      <input
        class="${classes}"
        id="radio3-${instanceId}"
        type="radio"
        name="radio-group"
        value="radio3"
      />
      <label class="usa-radio__label" for="radio3-${instanceId}">${label}</label>
    </div>
  `;

  return html`
    <form class="usa-form">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend">Select</legend>
        ${content}
      </fieldset>
    </form>
  `;
};

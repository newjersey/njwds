import { html } from "lit";

export interface CheckboxProps {
  tile: boolean;
  label: string;
}

export const Checkbox = ({ tile = false, label }: CheckboxProps) => {
  const instanceId = `${crypto.randomUUID()}`; // for storybook, to ensure unique ids for each checkbox instance
  const classes = tile ? "usa-checkbox__input usa-checkbox__input--tile" : "usa-checkbox__input";
  const tileLabel = tile
    ? html`<span class="usa-checkbox__label-description"
        >This is optional text that can be used to describe the label in moredetail.</span
      >`
    : "";

  const content = html`
    <div class="usa-checkbox">
      <input class="${classes}" id="chk1-${instanceId}" type="checkbox" value="chk1" checked />
      <label class="usa-checkbox__label" for="chk1-${instanceId}">${label} ${tileLabel}</label>
    </div>
    <div class="usa-checkbox">
      <input class="${classes}" id="chk2-${instanceId}" type="checkbox" value="chk2" />
      <label class="usa-checkbox__label" for="chk2-${instanceId}">${label} ${tileLabel}</label>
    </div>
    <div class="usa-checkbox">
      <input class="${classes}" id="chk3-${instanceId}" type="checkbox" value="chk3" />
      <label class="usa-checkbox__label" for="chk3-${instanceId}">${label} ${tileLabel}</label>
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

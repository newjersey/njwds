import { html } from "lit";

export interface RadioProps {
  tile: boolean;
  label: string;
  error: boolean;
  helperText: boolean;
  required: boolean;
}

export const Radio = ({ tile = false, label, error, helperText, required }: RadioProps) => {
  const instanceId = `${crypto.randomUUID()}`; // for storybook, to ensure unique ids for each radio instance
  const errorGroupClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "nj-radio--error" : "";
  const errorLabelClass = error ? "usa-label--error" : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  const classes = tile ? "usa-radio__input usa-radio__input--tile" : "usa-radio__input";
  const tileLabel = tile
    ? html`<span class="usa-radio__label-description"
        >This is optional text that can be used to describe the label in moredetail.</span
      >`
    : "";

  const content = html`
    <div class="usa-radio ${errorInputClass}">
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
    <div class="usa-radio ${errorInputClass}">
      <input
        class="${classes}"
        id="radio2-${instanceId}"
        type="radio"
        name="radio-group"
        value="radio2"
      />
      <label class="usa-radio__label" for="radio2-${instanceId}">${label} ${tileLabel}</label>
    </div>
    <div class="usa-radio ${errorInputClass}">
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
      <div class="usa-form-group ${errorGroupClass}">
        <fieldset class="usa-fieldset">
          <legend class="usa-legend ${errorLabelClass}">Select ${requiredHtml}</legend>
          ${helperText
            ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>`
            : ""}
          ${content}
        </fieldset>

        ${error
          ? html` <div class="nj-error-message-container">
              <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
                <use xlink:href="../../public/dist/img/sprite.svg#error"></use>
              </svg>
              <span class="usa-error-message" id="input-error-message" role="alert"
                >Helpful error message</span
              >
            </div>`
          : ""}
      </div>
    </form>
  `;
};

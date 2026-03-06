import { html } from "lit";

export interface CheckboxProps {
  tile: boolean;
  label: string;
  error: boolean;
  helperText: boolean;
  required: boolean;
}

export const Checkbox = ({ tile = false, label, error, helperText, required }: CheckboxProps) => {
  const instanceId = `${crypto.randomUUID()}`; // for storybook, to ensure unique ids for each checkbox instance
  const errorGroupClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "nj-checkbox--error" : "";
  const errorLabelClass = error ? "usa-label--error" : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  const classes = tile ? "usa-checkbox__input usa-checkbox__input--tile" : "usa-checkbox__input";
  const tileLabel = tile
    ? html`<span class="usa-checkbox__label-description"
        >This is optional text that can be used to describe the label in moredetail.</span
      >`
    : "";

  const content = html`
    <div class="usa-checkbox ${errorInputClass}">
      <input
        class="${classes}"
        id="checkbox1-${instanceId}"
        type="checkbox"
        name="checkbox-group"
        value="checkbox1"
        checked
      />
      <label class="usa-checkbox__label" for="checkbox1-${instanceId}">${label}</label>
    </div>
    <div class="usa-checkbox ${errorInputClass}">
      <input
        class="${classes}"
        id="checkbox2-${instanceId}"
        type="checkbox"
        name="checkbox-group"
        value="checkbox2"
      />
      <label class="usa-checkbox__label" for="checkbox2-${instanceId}">${label} ${tileLabel}</label>
    </div>
    <div class="usa-checkbox ${errorInputClass}">
      <input
        class="${classes}"
        id="checkbox3-${instanceId}"
        type="checkbox"
        name="checkbox-group"
        value="checkbox3"
      />
      <label class="usa-checkbox__label" for="checkbox3-${instanceId}">${label}</label>
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

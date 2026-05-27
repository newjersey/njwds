import { html } from "lit";
export interface NameProps {
  error: boolean;
  required: boolean;
  helperText: boolean;
}

export const Name = ({ error, required, helperText }: NameProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error margin-top-3" : "";

  const errorMessage = (errorId: string, message: string) => html`
    <div class="nj-error-message-container">
      <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
        <use xlink:href="./img/sprite.svg#error"></use>
      </svg>
      <span class="usa-error-message" id="${errorId}" role="alert">${message}</span>
    </div>
  `;

  return html`
    <form class="usa-form ${errorFormClass}">
      <fieldset class="usa-fieldset">
        <legend class="usa-legend font-heading-xl text-bold">Name</legend>
        <label
          aria-describedby="${helperText ? "hint-0" : undefined} ${error
            ? "input-error-0"
            : undefined}"
          class="usa-label ${errorLabelClass}"
          for="title"
        >
          Title
          ${required
            ? html`<abbr title="required" class="usa-label--required">*</abbr>`
            : html`<span class="usa-hint">(optional)</span>`}
        </label>
        ${helperText ? html`<div id="hint-0" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input usa-input--small ${errorInputClass}"
          id="title"
          name="title"
          type="text"
        />
        ${error ? errorMessage("input-error-0", "Helpful error message") : ""}

        <label class="usa-label ${errorLabelClass}" for="first-name">
          First name
          ${required
            ? html`<abbr title="required" class="usa-label--required">*</abbr>`
            : html`<span class="usa-hint">(optional)</span>`}
        </label>
        ${helperText ? html`<div id="hint-1" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input ${errorInputClass}"
          aria-describedby="${helperText ? "hint-1" : undefined} ${error
            ? "input-error-1"
            : undefined}"
          id="first-name"
          name="first-name"
          type="text"
          required
          aria-required="true"
        />

        ${error ? errorMessage("input-error-1", "Helpful error message") : ""}

        <label class="usa-label ${errorLabelClass}" for="middle-name">
          Middle name
          ${required
            ? html`<abbr title="required" class="usa-label--required">*</abbr>`
            : html`<span class="usa-hint">(optional)</span>`}
        </label>
        ${helperText ? html`<div id="hint-2" class="usa-hint">Helper text</div>` : ""}
        <input
          aria-describedby="${helperText ? "hint-2" : undefined} ${error
            ? "input-error-2"
            : undefined}"
          class="usa-input ${errorInputClass}"
          id="middle-name"
          name="middle-name"
          type="text"
        />

        ${error ? errorMessage("input-error-2", "Helpful error message") : ""}

        <label class="usa-label ${errorLabelClass}" for="last-name">
          Last name
          ${required
            ? html`<abbr title="required" class="usa-label--required">*</abbr>`
            : html`<span class="usa-hint">(optional)</span>`}
        </label>
        ${helperText ? html`<div id="hint-3" class="usa-hint">Helper text</div>` : ""}
        <input
          class="usa-input ${errorInputClass}"
          aria-describedby="${helperText ? "hint-3" : undefined} ${error
            ? "input-error-3"
            : undefined}"
          id="last-name"
          name="last-name"
          type="text"
          required
          aria-required="true"
        />
        ${error ? errorMessage("input-error-3", "Helpful error message") : ""}
      </fieldset>
    </form>
  `;
};

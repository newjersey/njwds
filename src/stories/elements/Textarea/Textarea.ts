import { html } from "lit";

export interface TextareaProps {
  label: string;
  error: boolean;
  success: boolean;
  required: boolean;
  helperText: boolean;
  characterCounter: boolean;
}

export const Textarea = ({
  label,
  error,
  success,
  required,
  helperText,
  characterCounter,
}: TextareaProps) => {
  const classes = error ? "usa-input--error" : success ? "usa-input--success" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const classCharacterCounter = characterCounter ? "usa-character-count__field" : "";
  const classCharacterAriaDescribedBy = characterCounter ? "with-hint-textarea-info" : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  const coreFieldHtml = html` <label class="usa-label ${classesLabel}" for="input-type-text">
      ${label} ${requiredHtml}
    </label>
    ${helperText ? html`<div id="with-hint-input-hint" class="usa-hint">Helper text</div>` : ""}
    <textarea
      class="usa-textarea ${classes} ${classCharacterCounter}"
      id="input-type-text"
      name="input-type-text"
      maxlength="50"
      aria-describedby="${classCharacterAriaDescribedBy} with-hint-textarea-hint"
    >
    </textarea>`;

  const secondaryFieldHtml = html` ${error
    ? html` <div class="nj-error-message-container">
        <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
          <use xlink:href="../../public/dist/img/sprite.svg#error"></use>
        </svg>
        <span class="usa-error-message" id="input-error-message" role="alert">
          Helpful error message
        </span>
      </div>`
    : ""}`;

  return html`
    <form class="usa-form">
      ${characterCounter
        ? html`
            <div class="usa-character-count">
              <div class="usa-form-group">${coreFieldHtml}</div>

              <span
                id="${classCharacterAriaDescribedBy}"
                class="usa-hint usa-character-count__message"
                aria-live="polite"
              >
                You can enter up to 50 characters
              </span>

              ${secondaryFieldHtml}
            </div>
          `
        : html` ${coreFieldHtml} ${secondaryFieldHtml} `}
    </form>
  `;
};

import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface TextareaProps {
  label: string;
  error: boolean;
  success: boolean;
  required: boolean;
  helperText: boolean;
  characterCounter: boolean;
  width: string;
}

export const Textarea = ({
  label,
  error,
  success,
  required,
  helperText,
  characterCounter,
  width,
}: TextareaProps) => {
  const classes = error ? "usa-input--error" : success ? "usa-input--success" : "";
  const classesLabel = error ? "usa-label--error" : "";
  const classCharacterCounter = characterCounter ? "usa-character-count__field" : "";
  const errorGroupClass = error ? "usa-form-group--error" : "";
  const widthClass = `usa-input--${width}`;

  // Build aria-describedby with only the IDs that exist
  const ariaDescribedBy = [
    helperText ? "with-hint-textarea-hint" : "",
    characterCounter ? "with-hint-textarea-info" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const coreFieldHtml = html` <label class="usa-label ${classesLabel}" for="input-type-text">
      ${label} ${renderRequired(required)}
    </label>
    ${helperText
      ? html`<span id="with-hint-textarea-hint" class="usa-hint">Helper text</span>`
      : ""}
    <textarea
      class="usa-textarea ${classes} ${classCharacterCounter} ${widthClass}"
      id="input-type-text"
      name="input-type-text"
      maxlength="50"
      aria-describedby="${ariaDescribedBy}"
    >
    </textarea>`;

  const secondaryFieldHtml = html` ${error
    ? renderErrorMessage("input-error-message", "Helpful error message")
    : ""}`;

  return html`
    <div class="grid-container">
      <form class="usa-form maxw-none ${errorGroupClass}">
        ${characterCounter
          ? html`
              <div class="usa-character-count">
                <div class="usa-form-group">${coreFieldHtml}</div>

                <span
                  id="with-hint-textarea-info"
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
    </div>
  `;
};

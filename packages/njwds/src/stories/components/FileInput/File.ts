import { html } from "lit";
import { renderErrorMessage } from "../../../utils/errorMessage";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface FileProps {
  label: string;
  error: boolean;
  required: boolean;
  helperText: boolean;
  multipleFiles: boolean;
}

export const File = ({ label, error, required, helperText, multipleFiles }: FileProps) => {
  const errorFormClass = error ? "usa-form-group--error" : "";
  const errorInputClass = error ? "usa-input--error" : "";
  const errorLabelClass = error ? "usa-label--error" : "";

  return html`
    <form class="usa-form ${errorFormClass}">
      <label class="usa-label ${errorLabelClass}" for="file-html">
        ${label} ${renderRequired(required)}
      </label>
      ${helperText
        ? html`<div id="with-hint-input-hint" class="usa-hint">Example: document.pdf</div>`
        : ""}
      <input
        class="usa-input ${errorInputClass}"
        id="file-html"
        name="input-type-file"
        ?multiple=${multipleFiles}
        type="file"
      />
      ${error ? renderErrorMessage("input-error-message", "Helpful error message") : ""}
    </form>
  `;
};

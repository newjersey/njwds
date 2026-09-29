import { html, nothing } from "lit";
import { renderRequired } from "../../../utils/requiredIndicator";

export interface FileComponentProps {
  error: boolean;
  multipleFiles: boolean;
  fileTypes: string;
  required: boolean;
  helperText: boolean;
}

export const FileComponent = ({
  error = false,
  multipleFiles,
  fileTypes,
  required,
  helperText,
}: FileComponentProps) => {
  const errorMsg = error
    ? html`<span class="usa-error-message" id="file-error" role="alert"
        >Display a helpful error message</span
      >`
    : nothing;
  const errorGroupClasses = error ? `usa-form-group--error` : "";
  const errorLabelClasses = error ? `usa-label--error` : "";

  return html`
    <form class="usa-form">
      <div class="usa-form-group ${errorGroupClasses}">
        <label class="usa-label ${errorLabelClasses}" for="file">
          File input label ${renderRequired(required)}
        </label>
        ${helperText ? html`<div id="file-hint" class="usa-hint">Select any valid file</div>` : ""}
        ${errorMsg}

        <input
          class="usa-file-input"
          id="file"
          name="input-type-file"
          type="file"
          ?multiple=${multipleFiles}
          accept=${fileTypes || nothing}
          aria-describedby=${error ? "file-error" : nothing}
        />
      </div>
    </form>
  `;
};

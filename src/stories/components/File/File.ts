import { html, nothing } from "lit";

export interface FileComponentProps {
  error: boolean;
  multipleFiles: boolean;
  fileTypes: string;
  required: boolean;
}

export const FileComponent = ({ error = false, fileTypes, required }: FileComponentProps) => {
  const errorMsg = error
    ? html`<span class="usa-error-message" id="file-error" role="alert"
        >Display a helpful error message</span
      >`
    : nothing;
  const errorGroupClasses = error ? `usa-form-group--error` : "";
  const errorLabelClasses = error ? `usa-label--error` : "";
  const requiredHtml = required
    ? html`<abbr title="required" class="usa-label--required">*</abbr>`
    : "";

  return html`
    <form class="usa-form">
      <div class="usa-form-group ${errorGroupClasses}">
        <label class="usa-label ${errorLabelClasses}" for="file">
          File input label ${requiredHtml}
        </label>
        <div class="usa-hint" id="file-hint">Select any valid file</div>

        ${errorMsg}
        <input
          class="usa-file-input"
          id="file"
          name="input-type-file"
          type="file"
          accept=${fileTypes || nothing}
          aria-describedby=${error ? "file-error" : nothing}
        />
      </div>
    </form>
  `;
};

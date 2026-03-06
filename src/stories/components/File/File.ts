import { html, nothing } from "lit";

export interface FileComponentProps {
  error: boolean;
  multipleFiles: boolean;
  fileTypes: string;
}

export const FileComponent = ({ error = false, fileTypes }: FileComponentProps) => {
  const errorMsg = error
    ? html`<span class="usa-error-message" id="file-error" role="alert"
        >Display a helpful error message</span
      >`
    : nothing;
  const errorGroupClasses = error ? `usa-form-group--error` : "";
  const errorLabelClasses = error ? `usa-label--error` : "";

  return html`
    <div class="usa-form-group ${errorGroupClasses}">
      <label class="usa-label ${errorLabelClasses}" for="file">
        File input label
        <div class="usa-hint" id="file-hint">Select any valid file</div>
      </label>

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
  `;
};

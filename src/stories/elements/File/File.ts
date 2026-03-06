import { html } from "lit";

export interface FileProps {
  styled: boolean;
  error: boolean;
  multipleFiles: boolean;
  fileTypes: string;
  disabled: boolean;
}

export const File = ({
  styled = false,
  disabled = false,
  error = false,
  multipleFiles = false,
  fileTypes,
}: FileProps) => {
  const instanceId = `${crypto.randomUUID()}`; // for storybook, to ensure unique ids for each instance

  // Boolean states
  const allowMultiple = multipleFiles ? "multiple" : "";
  const isDisabled = disabled ? "disabled" : "";

  // File types
  const fileTypesAttr = fileTypes ? `accept="${fileTypes}"` : "";

  // Styled states
  const classes = styled ? "usa-form-group" : "";
  const styledMsg = styled
    ? html`<span class="usa-hint" id="file-hint">Select any valid file</span>`
    : "";

  // Error states
  const errorMsg = error
    ? html`<span class="usa-error-message" id="file-error-${instanceId}" role="alert"
        >Display a helpful error message</span
      >`
    : "";
  const errorMrgRef = error ? `aria-describedby="file-error-${instanceId}"` : "";
  const errorGroupClasses = error ? `usa-form-group--error` : "";
  const errorLabelClasses = error ? `uusa-label--error` : "";

  return html`
    <div class="${classes} ${errorGroupClasses}">
      <label class="usa-label ${errorLabelClasses}" for="file-${instanceId}"
        >File input label</label
      >
      ${styledMsg} ${errorMsg}
      <input
        class="usa-input"
        id="file-${instanceId}"
        name="input-type-file"
        type="file"
        ${fileTypesAttr}
        ${isDisabled}
        ${errorMrgRef}
        ${allowMultiple}
      />
    </div>
    html here! ${classes} ${styled}
  `;
};

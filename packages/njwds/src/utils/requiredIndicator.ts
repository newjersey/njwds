import { html, type TemplateResult } from "lit";

/**
 * Renders a required field indicator using <abbr> for accessibility.
 *
 * @param required - Whether the field is required
 */
export const renderRequired = (required: boolean): TemplateResult | string => {
  return required ? html`<abbr title="required" class="usa-label--required">*</abbr>` : "";
};

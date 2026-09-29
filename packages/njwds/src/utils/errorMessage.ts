import { html, type TemplateResult } from "lit";

/**
 * Renders an error message for form inputs with icon and alert role.
 *
 * @param id - Unique ID for aria-describedby reference
 * @param message - Error message text
 */
export const renderErrorMessage = (id: string, message: string): TemplateResult => {
  return html`
    <div class="nj-error-message-container">
      <svg class="usa-icon" focusable="false" aria-hidden="true" role="img">
        <use href="./img/sprite.svg#error"></use>
      </svg>
      <span class="usa-error-message" id="${id}" role="alert">${message}</span>
    </div>
  `;
};

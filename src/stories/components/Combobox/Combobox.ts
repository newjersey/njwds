import { html } from "lit";

export interface ComboboxProps {
  label: string;
  defaultValue: string;
}

export const ComboboxComponent = ({ label, defaultValue }: ComboboxProps) => {
  return html`
    <label class="usa-label" for="options">${label}</label>
    <div class="usa-combo-box" data-default-value="${defaultValue}">
      <select class="usa-select" name="options" id="options">
        <option value="" disabled>Select an option</option>
        <option value="1">Option 1</option>
        <option value="${defaultValue}">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
      </select>
    </div>
  `;
};

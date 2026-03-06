import { html } from "lit";

export interface SelectProps {
  label: string;
}

export const Select = ({ label }: SelectProps) => {
  return html`
    <form class="usa-form">
      <label class="usa-label" for="options">${label}</label>
      <select class="usa-select" name="options" id="options">
        <option value="" selected disabled>Choose an option</option>
        <option value="value1">Option A</option>
        <option value="value2">Option B</option>
        <option value="value3">Option C</option>
      </select>
    </form>
  `;
};

import { html } from "lit";

export interface RangeProps {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
}

export const Range = ({ label, min, max, step, value }: RangeProps) => {
  return html`
    <form class="usa-form">
      <label class="usa-label" for="range-slider">${label}</label>
      <input
        id="range-slider"
        class="usa-range"
        type="range"
        min="${min}"
        max="${max}"
        step="${step}"
        value="${value}"
      />
    </form>
  `;
};

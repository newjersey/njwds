import { html } from "lit";

export interface ButtonGroupProps {
  segmented: boolean;
}

export const ButtonGroup = ({ segmented }: ButtonGroupProps) => {
  const classList = segmented ? "usa-button-group--segmented" : "";

  return html`
    <ul class="usa-button-group ${classList}">
      <li class="usa-button-group__item">
        <button class="usa-button">Map</button>
      </li>
      <li class="usa-button-group__item">
        <button class="usa-button usa-button--outline">Satellite</button>
      </li>
      <li class="usa-button-group__item">
        <button class="usa-button usa-button--outline">Hybrid</button>
      </li>
    </ul>
  `;
};

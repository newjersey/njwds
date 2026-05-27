import { html } from "lit";

export interface IconListProps {
  richContent: boolean;
  size: "default" | "md" | "lg" | "xl" | "2xl";
}

export const IconList = ({ richContent, size }: IconListProps) => {
  const sizeClass = size !== "default" ? `usa-icon-list--size-${size}` : "";

  const listItemContent = richContent
    ? html`
        <p class="usa-icon-list__title text-bold">Icon list item text</p>
        <p>Item description.</p>
      `
    : html`Icon list item text`;

  const items = Array(3).fill(null);

  return html`
    <ul class="usa-icon-list ${sizeClass}">
      ${items.map(
        () => html`
          <li class="usa-icon-list__item">
            <div class="usa-icon-list__icon">
              <svg class="usa-icon" aria-hidden="true" role="img">
                <use href="./img/sprite.svg#arrow_forward"></use>
              </svg>
            </div>
            <div class="usa-icon-list__content">${listItemContent}</div>
          </li>
        `,
      )}
    </ul>
  `;
};

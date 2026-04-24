import { html } from "lit";

export interface IconListProps {
  richtext?: boolean;
  largeSize?: boolean;
}

export const IconList = ({ richtext, largeSize }: IconListProps) => {
  const sizeClass = largeSize ? "usa-icon-list--size-lg" : "";

  const $listItemContent = richtext
    ? html`
        <h4 class="usa-icon-list__title">Donate cash when possible.</h4>
        <p>
          Financial contributions to recognized disaster relief organizations are the fastest, most
          flexible and most effective method of donating. Organizations on the ground know what
          items and quantities are needed, often buy in bulk with discounts and, if possible,
          purchase through businesses local to the disaster, which supports economic recovery.
        </p>
      `
    : html`This is example text for an icon list item.`;

  return html`
    <ul class="usa-icon-list ${sizeClass}">
      <li class="usa-icon-list__item">
        <div class="usa-icon-list__icon text-green">
          <svg class="usa-icon usa-icon--size-4" aria-hidden="true" role="img">
            <use href="./img/sprite.svg#check_circle"></use>
          </svg>
        </div>
        <div class="usa-icon-list__content">${$listItemContent}</div>
      </li>
      <li class="usa-icon-list__item">
        <div class="usa-icon-list__icon">
          <svg class="usa-icon usa-icon--size-4" aria-hidden="true" role="img">
            <use href="./img/sprite.svg#thumb_up_alt"></use>
          </svg>
        </div>
        <div class="usa-icon-list__content">${$listItemContent}</div>
      </li>
      <li class="usa-icon-list__item">
        <div class="usa-icon-list__icon text-red">
          <svg class="usa-icon usa-icon--size-4" aria-hidden="true" role="img">
            <use href="./img/sprite.svg#cancel"></use>
          </svg>
        </div>
        <div class="usa-icon-list__content">${$listItemContent}</div>
      </li>
    </ul>
  `;
};

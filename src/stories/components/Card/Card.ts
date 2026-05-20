import { html } from "lit";

export interface CardProps {
  media: boolean;
  layout: string;
  mediaExtend: boolean;
  flagPositionRight: boolean;
  mediaFirst: boolean;
  mediaSize: string;
}

export const Card = ({
  media,
  mediaExtend,
  flagPositionRight,
  layout = "Default",
  mediaFirst,
  mediaSize,
}: CardProps) => {
  const mediaExtendOption = mediaExtend ? "" : "usa-card__media--inset";
  const mediaFirstClass = mediaFirst ? "" : "usa-card--header-first";
  const flagPositionClass = flagPositionRight ? "usa-card--media-right" : "";

  const mediaSizeHtml =
    mediaSize === "xs"
      ? html` <img src="./img/card-media-xs.png" alt="A placeholder image" /> `
      : mediaSize === "sm"
        ? html` <img src="./img/card-media-sm.png" alt="A placeholder image" /> `
        : mediaSize === "md"
          ? html` <img src="./img/card-media-md.png" alt="A placeholder image" /> `
          : mediaSize === "lg"
            ? html` <img src="./img/card-media-lg.png" alt="A placeholder image" /> `
            : mediaSize === "lg-flag"
              ? html` <img src="./img/card-media-lg-flag.png" alt="A placeholder image" /> `
              : ``;

  const mediaContent = media
    ? html`<div class="usa-card__media ${mediaExtendOption}">
        <div class="usa-card__img">${mediaSizeHtml}</div>
      </div>`
    : null;

  const layoutClass = layout === "Flag" ? "usa-card--flag tablet:grid-col-6" : "tablet:grid-col-4";

  return html`<ul class="usa-card-group">
    <li class="usa-card ${layoutClass} ${mediaFirstClass} ${flagPositionClass}">
      <div class="usa-card__container">
        <header class="usa-card__header">
          <h2 class="usa-card__heading">Default card</h2>
        </header>
        ${mediaContent}
        <div class="usa-card__body">
          <p>Nemo illo et error deserunt qui doloremque provident perferendis fuga pariatur eum?</p>
        </div>
        <div class="usa-card__footer">
          <button class="usa-button">Action</button>
        </div>
      </div>
    </li>
  </ul>`;
};

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

  const getMediaImage = (size: string) => {
    const sizeMap: Record<string, string> = {
      xs: "./img/card-media-xs.png",
      sm: "./img/card-media-sm.png",
      md: "./img/card-media-md.png",
      lg: "./img/card-media-lg.png",
      "lg-flag": "./img/card-media-lg-flag.png",
    };

    const imageSrc = sizeMap[size];
    return imageSrc ? html`<img src="${imageSrc}" alt="A placeholder image" />` : "";
  };

  const mediaSizeHtml = getMediaImage(mediaSize);

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

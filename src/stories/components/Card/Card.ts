import { html } from "lit";

export interface CardProps {
  media: boolean;
  layout: string;
  mediaInset: boolean;
  flagPositionRight: boolean;
}

export const Card = ({ media, mediaInset, flagPositionRight, layout = "Default" }: CardProps) => {
  const mediaInsetOption = mediaInset ? "usa-card__media--inset" : "";
  const mediaInsetClass = mediaInset ? "usa-card--header-first" : "";
  const flagPositionClass = flagPositionRight ? "usa-card--media-right" : "";

  const mediaContent = media
    ? html`<div class="usa-card__media ${mediaInsetOption}">
        <div class="usa-card__img">
          <img
            src="https://designsystem.digital.gov/img/introducing-uswds-2-0/built-to-grow--alt.jpg"
            alt="A placeholder image"
          />
        </div>
      </div>`
    : null;

  const layoutClass = layout === "Flag" ? "usa-card--flag tablet:grid-col-6" : "tablet:grid-col-4";

  return html`<ul class="usa-card-group">
    <li class="usa-card ${layoutClass} ${mediaInsetClass} ${flagPositionClass}">
      <div class="usa-card__container">
        <header class="usa-card__header">
          <h2 class="usa-card__heading">Default card</h2>
        </header>
        ${mediaContent}
        <div class="usa-card__body">
          <p>Nemo illo et error deserunt qui doloremque provident perferendis fuga pariatur eum?</p>
        </div>
        <div class="usa-card__footer">
          <button class="usa-button">Visit Florida Keys</button>
        </div>
      </div>
    </li>
  </ul>`;
};

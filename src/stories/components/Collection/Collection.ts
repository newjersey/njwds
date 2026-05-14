import { html } from "lit";

export interface CollectionProps {
  type: string;
  externalLinks: boolean;
  showTags: boolean;
  showDescription: boolean;
  showMeta: boolean;
}

export const Collection = ({
  type,
  externalLinks,
  showTags,
  showDescription,
  showMeta,
}: CollectionProps) => {
  return html`
    <ul class="usa-collection">
      <li class="usa-collection__item">
        ${type === "media"
          ? html`
              <img
                class="usa-collection__img"
                src="https://nj.gov/nj/library/logo_nj.png"
                alt="NJ.gov logo"
              />
            `
          : null}
        ${type === "calendar"
          ? html`
              <div class="usa-collection__calendar-date">
                <time datetime="2020-09-30T12:00:00+01:00"
                  ><span class="usa-collection__calendar-date-month">SEP</span>
                  <span class="usa-collection__calendar-date-day">30</span></time
                >
              </div>
            `
          : null}

        <div class="usa-collection__body">
          <h4 class="usa-collection__heading">
            ${externalLinks
              ? html`
                  <a href="#!" class="usa-link usa-link--external" target="_blank" rel="noreferrer">
                    Ipsum quam malesuada velit
                    <span class="usa-sr-only">(opens in a new window)</span>
                  </a>
                `
              : html`<a href="#!">Ipsum quam malesuada velit</a>`}
          </h4>
          ${showDescription
            ? html`
                <p class="usa-collection__description">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sit amet nulla
                  interdum, hendrerit ex in, pulvinar arcu. Maecenas auctor, leo ac dapibus
                  pellentesque, ipsum quam malesuada velit, ac accumsan nibh lacus non quam.
                </p>
              `
            : null}
          ${showMeta
            ? html`
                <ul class="usa-collection__meta" aria-label="More information">
                  <li class="usa-collection__meta-item">By Human Person</li>
                  <li class="usa-collection__meta-item">
                    <time datetime="2020-09-30T12:00:00+01:00">September 30, 2020</time>
                  </li>
                </ul>
              `
            : null}
          ${showTags
            ? html`
                <ul class="usa-collection__meta" aria-label="Topics">
                  <li class="usa-collection__meta-item usa-tag">AMET</li>
                  <li class="usa-collection__meta-item usa-tag">DHS</li>
                  <li class="usa-collection__meta-item usa-tag">QUAM</li>
                </ul>
              `
            : null}
        </div>
      </li>
    </ul>
  `;
};

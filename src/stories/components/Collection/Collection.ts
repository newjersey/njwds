import { html } from "lit";

export interface CollectionProps {
  media: string;
  showTags: boolean;
  showContent: boolean;
  showMeta: boolean;
}

export const Collection = ({ media, showTags, showContent, showMeta }: CollectionProps) => {
  return html`
    <ul class="usa-collection">
      <li class="usa-collection__item">
        ${media === "thumbnail"
          ? html`
              <img
                class="usa-collection__img"
                src="https://nj.gov/nj/library/logo_nj.png"
                alt="NJ.gov logo"
              />
            `
          : null}
        ${media === "calendar"
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
            <a class="usa-link" href="#!">Duis sit amet nulla interdum</a>
          </h4>
          ${showContent
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

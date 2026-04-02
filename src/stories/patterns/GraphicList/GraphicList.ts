import { html } from "lit";

export const GraphicList = () => {
  const GraphicListSection = html`
    <div class="usa-media-block tablet:grid-col">
      <img
        class="usa-media-block__img"
        src="../../public/dist/img/circle-124.png"
        alt="placeholder image"
      />
      <div class="usa-media-block__body">
        <h2 class="usa-graphic-list__heading">Graphic headings can vary</h2>
        <p>
          Graphic headings can be used a few different ways, depending on what your landing page is
          for. Highlight your values, specific program areas, or results.
        </p>
      </div>
    </div>
  `;

  return html`
    <section class="usa-graphic-list usa-section usa-section--dark">
      <div class="grid-container">
        <div class="usa-graphic-list__row grid-row grid-gap">
          ${GraphicListSection} ${GraphicListSection}
        </div>
        <div class="usa-graphic-list__row grid-row grid-gap">
          ${GraphicListSection} ${GraphicListSection}
        </div>
      </div>
    </section>
  `;
};

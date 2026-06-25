import { html } from "lit";

type Mode = "light" | "dark";

export interface GraphicListProps {
  mode: Mode;
}

export const GraphicList = ({ mode = "dark" }: GraphicListProps) => {
  // The "usa-section--light" class have a gray background and we're using white/default in our recommendation.
  const isDarkTheme = mode === "dark" ? "usa-section--dark" : "";

  const GraphicListSection = html`
    <div class="usa-media-block tablet:grid-col">
      <img
        class="usa-media-block__img"
        src="./img/graphic-list.svg"
        alt="placeholder image: blue globe with a left-facing shadow"
      />
      <div class="usa-media-block__body">
        <h2 class="usa-graphic-list__heading">{heading}</h2>
        <p>
          Graphic headings can be used a few different ways, depending on what your landing page is
          for. Highlight your values, specific program areas, or results.
        </p>
      </div>
    </div>
  `;

  return html`
    <section class="usa-graphic-list usa-section ${isDarkTheme}">
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

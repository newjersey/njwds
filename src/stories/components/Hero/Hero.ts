import { html } from "lit";

export const LINK_DISPLAY_TYPES = {
  BUTTON: "usa-button",
  LINK: "usa-link",
} as const;

export interface HeroProps {
  heading: string;
  subheading?: string;
  explainerText: string;
}

export const Hero = ({ heading, subheading, explainerText }: HeroProps) => {
  return html` <section class="usa-hero" aria-label="Introduction" background="your_image.jpg">
    <div class="grid-container">
      <div class="usa-hero__callout">
        <h1 class="usa-hero__heading">
          <span class="usa-hero__heading--alt">${heading}</span>
          ${subheading ?? ""}
        </h1>
        <p>${explainerText}</p>
        <a class="usa-button" href="#!">Call to action</a>
      </div>
    </div>
  </section>`;
};

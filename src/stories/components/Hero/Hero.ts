import { html } from "lit";

export const LINK_DISPLAY_TYPES = {
  BUTTON: "usa-button",
  LINK: "usa-link",
} as const;

type LinkDisplayType = (typeof LINK_DISPLAY_TYPES)[keyof typeof LINK_DISPLAY_TYPES];

export interface HeroLink {
  linkDisplay: LinkDisplayType;
  linkText: string;
  linkLocation: string;
  linkClasses?: string;
}

export interface HeroProps {
  heading: string;
  subheading?: string;
  explainerText: string;
  heroLink?: HeroLink;
}

export const Hero = ({ heading, subheading, explainerText, heroLink }: HeroProps) => {
  const getHeroLink = () => {
    if (heroLink == null) {
      return ``;
    }

    return html`
      <a class="${heroLink.linkDisplay} linkClasses" href=${heroLink.linkLocation}
        >${heroLink.linkText}</a
      >
    `;
  };

  return html` <section class="usa-hero" aria-label="Introduction" background="your_image.jpg">
    <div class="grid-container">
      <div class="usa-hero__callout">
        <h1 class="usa-hero__heading">
          <span class="usa-hero__heading--alt">${heading}</span>
          ${subheading ?? ""}
        </h1>
        <p>${explainerText}</p>
        ${getHeroLink()}
      </div>
    </div>
  </section>`;
};

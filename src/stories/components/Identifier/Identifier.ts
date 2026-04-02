import { html } from "lit";
import enContent from "./translations/en.json";
import esContent from "./translations/es.json";

export interface IdentifierProps {
  language: "English" | "Spanish";
  logos: "None" | "Single" | "Multiple";
  showTaxpayerDisclaimer: boolean;
}

export const Identifier = ({ language, logos, showTaxpayerDisclaimer }: IdentifierProps) => {
  // Set language
  const content = language === "Spanish" ? esContent : enContent;

  // Masthead logos section - conditional based on logos prop
  let logosSection = null;

  if (logos === "Single") {
    logosSection = html`
      <div class="usa-identifier__logos">
        <a href="https://nj.gov" class="usa-identifier__logo">
          <img
            class="usa-identifier__logo-img"
            src="./img/nj-logo-gray-20.png"
            alt="${content.masthead.parentLogoAlt}"
            role="img"
          />
        </a>
      </div>
    `;
  } else if (logos === "Multiple") {
    logosSection = html`
      <div class="usa-identifier__logos">
        <a href="https://nj.gov" class="usa-identifier__logo">
          <img
            class="usa-identifier__logo-img"
            src="./img/nj-logo-gray-20.png"
            alt="${content.masthead.parentLogoAlt}"
            role="img"
          />
        </a>
        <a href="#!" class="usa-identifier__logo">
          <img
            class="usa-identifier__logo-img"
            src="./img/circle-gray-20.svg"
            alt="${content.masthead.agencyLogoAlt}"
            role="img"
          />
        </a>
      </div>
    `;
  }

  // Taxpayer disclaimer - conditional
  const taxpayerDisclaimer = showTaxpayerDisclaimer
    ? html` ${content.masthead.taxpayerDisclaimer}`
    : null;

  return html`
    <div class="usa-identifier">
      <section
        class="usa-identifier__section usa-identifier__section--masthead"
        aria-label="${content.masthead.ariaLabel}"
      >
        <div class="usa-identifier__container">
          ${logosSection}
          <div class="usa-identifier__identity" aria-label="${content.masthead.descriptionLabel}">
            <p class="usa-identifier__identity-disclaimer">
              ${content.masthead.text}
              <a href="https://nj.gov">${content.masthead.parentName}</a>.${taxpayerDisclaimer
                ? html` ${taxpayerDisclaimer}.`
                : null}
            </p>
          </div>
        </div>
      </section>
      <nav
        class="usa-identifier__section usa-identifier__section--required-links"
        aria-label="${content.requiredLinks.ariaLabel}"
      >
        <div class="usa-identifier__container">
          <ul class="usa-identifier__required-links-list">
            <li class="usa-identifier__required-links-item">
              <a href="https://nj.gov/governor/admin/about/" class="usa-identifier__required-link">
                Governor Mikie Sherrill
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a href="https://nj.gov/governor/admin/lt/" class="usa-identifier__required-link">
                Lt. Governor Dr. Dale G. Caldwell
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a href="https://nj.gov/" class="usa-identifier__required-link usa-link"> NJ Home </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a
                href="https://nj.gov/nj/gov/njgov/alphaserv.html"
                class="usa-identifier__required-link usa-link"
              >
                Services A to Z
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a
                href="https://nj.gov/nj/gov/deptserv/"
                class="usa-identifier__required-link usa-link"
              >
                Departments/Agencies
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a href="https://nj.gov/faqs/" class="usa-identifier__required-link usa-link">
                FAQs
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a
                href="https://nj.gov/nj/feedback.html"
                class="usa-identifier__required-link usa-link"
              >
                Contact Us
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a
                href="https://nj.gov/nj/privacy.html"
                class="usa-identifier__required-link usa-link"
              >
                Privacy Notice
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a href="https://nj.gov/nj/legal.html" class="usa-identifier__required-link usa-link">
                Legal Statement & Disclaimers
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a
                href="https://nj.gov/nj/accessibility.html"
                class="usa-identifier__required-link usa-link"
              >
                Accessibility
              </a>
            </li>
            <li class="usa-identifier__required-links-item">
              <a href="https://nj.gov/opra/" class="usa-identifier__required-link usa-link">
                Open Public Records Act (OPRA)
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <section
        class="usa-identifier__section usa-identifier__section--usagov"
        aria-label="${content.copyright.ariaLabel}"
      >
        <div class="usa-identifier__container">
          <div class="usa-identifier__usagov-description">${content.copyright.description}</div>
        </div>
      </section>
    </div>
  `;
};

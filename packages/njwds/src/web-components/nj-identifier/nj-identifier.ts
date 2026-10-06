import { LitElement, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import sheet from "./nj-identifier.scss?inline";
import { getIdentifierContent, getRequiredLinks, type IdentifierLanguage } from "./nj-identifier.content";
import { classNames } from "../../utils/classNames";
import { hostStyles } from "../shared-styles";
import njLogo from "../../img/nj-logo-gray-20.png";

export interface LogoInfo {
  src: string;
  href?: string;
  alt?: string;
}

@customElement("nj-identifier")
export class NjIdentifier extends LitElement {
  static styles = [hostStyles, unsafeCSS(sheet)];

  @property({ type: String }) language: IdentifierLanguage = "en";

  @property({ type: Boolean, attribute: "hide-logo" }) hideLogo = false;

  @property({ type: Boolean, attribute: "taxpayer-disclaimer" }) taxpayerDisclaimer = false;

  @property({ attribute: false }) additionalLogos: LogoInfo[] = [];

  render() {
    const content = getIdentifierContent(this.language);
    const requiredLinks = getRequiredLinks();

    return html`
      <div class="usa-identifier" lang=${this.language}>
        <section
          class="usa-identifier__section usa-identifier__section--masthead"
          part="masthead"
          aria-label=${content.masthead.ariaLabel}
        >
          <div class="usa-identifier__container">
            ${
              !this.hideLogo
                ? html`
                    <div class="usa-identifier__logos">
                      <a href="https://nj.gov" class="usa-identifier__logo">
                        <img
                          class="usa-identifier__logo-img"
                          src=${njLogo}
                          alt=${content.masthead.parentLogoAlt}
                          role="img"
                        />
                      </a>
                      ${this.additionalLogos.map(
                        (logo) => html`
                          <a href=${logo.href ?? "#!"} class="usa-identifier__logo">
                            <img
                              class="usa-identifier__logo-img"
                              src=${logo.src}
                              alt=${logo.alt ?? content.masthead.agencyLogoAlt}
                              role="img"
                            />
                          </a>
                        `,
                      )}
                    </div>
                  `
                : null
            }
            <div class="usa-identifier__identity" aria-label=${content.masthead.descriptionLabel}>
              <p class="usa-identifier__identity-disclaimer">
                ${content.masthead.text}
                <a href="https://nj.gov">${content.masthead.parentName}</a>.
                ${this.taxpayerDisclaimer ? html` ${content.masthead.taxpayerDisclaimer}` : null}
              </p>
            </div>
          </div>
        </section>
        <nav
          class="usa-identifier__section usa-identifier__section--required-links"
          part="required-links"
          aria-label=${content.requiredLinks.ariaLabel}
        >
          <div class="usa-identifier__container">
            <ul class="usa-identifier__required-links-list">
              ${requiredLinks.map(
                (link) => html`
                  <li class="usa-identifier__required-links-item">
                    <a
                      href=${link.href}
                      class=${classNames("usa-identifier__required-link", link.usaLink && "usa-link")}
                    >
                      ${link.label}
                    </a>
                  </li>
                `,
              )}
            </ul>
          </div>
        </nav>
        <section
          class="usa-identifier__section usa-identifier__section--usagov"
          part="usagov"
          aria-label=${content.copyright.ariaLabel}
        >
          <div class="usa-identifier__container">
            <div class="usa-identifier__usagov-description">${content.copyright.description}</div>
          </div>
        </section>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nj-identifier": NjIdentifier;
  }
}

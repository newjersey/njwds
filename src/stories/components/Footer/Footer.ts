import { html } from "lit";

export interface FooterProps {
  variant: "Default" | "Big" | "Slim";
}

export const Footer = ({ variant }: FooterProps) => {
  const footerClass =
    variant === "Big"
      ? "usa-footer usa-footer--big"
      : variant === "Slim"
        ? "usa-footer usa-footer--slim"
        : "usa-footer";

  // Return to top section (shared by all variants)
  const returnToTop = html`
    <div class="grid-container usa-footer__return-to-top">
      <a href="#">Return to top</a>
    </div>
  `;

  // Primary section - varies by variant
  let primarySection;

  if (variant === "Default") {
    primarySection = html`
      <div class="usa-footer__primary-section">
        <nav class="usa-footer__nav" aria-label="Footer navigation">
          <ul class="grid-row grid-gap">
            <li class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
              <a class="usa-footer__primary-link" href="#!">Primary link</a>
            </li>
            <li class="mobile-lg:grid-col-4 desktop:grid-col-auto usa-footer__primary-content">
              <a class="usa-footer__primary-link" href="#!">Primary link</a>
            </li>
          </ul>
        </nav>
      </div>
    `;
  } else if (variant === "Big") {
    primarySection = html`
      <div class="usa-footer__primary-section">
        <div class="grid-container">
          <div class="grid-row grid-gap">
            <div class="tablet:grid-col-8">
              <nav class="usa-footer__nav" aria-label="Footer navigation">
                <div class="grid-row grid-gap-4">
                  <div class="mobile-lg:grid-col-6 desktop:grid-col-3">
                    <section
                      class="usa-footer__primary-content usa-footer__primary-content--collapsible"
                    >
                      <h4 class="usa-footer__primary-link">Topic</h4>
                      <ul class="usa-list usa-list--unstyled">
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                      </ul>
                    </section>
                  </div>
                  <div class="mobile-lg:grid-col-6 desktop:grid-col-3">
                    <section
                      class="usa-footer__primary-content usa-footer__primary-content--collapsible"
                    >
                      <h4 class="usa-footer__primary-link">Topic</h4>
                      <ul class="usa-list usa-list--unstyled">
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                        <li class="usa-footer__secondary-link">
                          <a href="#!">Secondary link that's pretty long</a>
                        </li>
                      </ul>
                    </section>
                  </div>
                  <div class="mobile-lg:grid-col-6 desktop:grid-col-3">
                    <section
                      class="usa-footer__primary-content usa-footer__primary-content--collapsible"
                    >
                      <h4 class="usa-footer__primary-link">Topic</h4>
                      <ul class="usa-list usa-list--unstyled">
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                      </ul>
                    </section>
                  </div>
                  <div class="mobile-lg:grid-col-6 desktop:grid-col-3">
                    <section
                      class="usa-footer__primary-content usa-footer__primary-content--collapsible"
                    >
                      <h4 class="usa-footer__primary-link">Topic</h4>
                      <ul class="usa-list usa-list--unstyled">
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                        <li class="usa-footer__secondary-link"><a href="#!">Secondary link</a></li>
                      </ul>
                    </section>
                  </div>
                </div>
              </nav>
            </div>
            <div class="tablet:grid-col-4">
              <div class="usa-sign-up">
                <h3 class="usa-sign-up__heading">Sign up</h3>
                <form class="usa-form" action="POST">
                  <label class="usa-label" for="sb-email" id="">Your email address</label>
                  <input class="usa-input" id="sb-email" name="email" type="email" />
                  <button class="usa-button" type="submit">Sign up</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Slim variant
    primarySection = html`
      <div class="usa-footer__primary-section">
        <div class="usa-footer__primary-container grid-row">
          <div class="mobile-lg:grid-col-8">
            <nav class="usa-footer__nav" aria-label="Footer navigation">
              <ul class="grid-row grid-gap">
                <li class="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="#!">Primary link</a>
                </li>
                <li class="mobile-lg:grid-col-6 desktop:grid-col-auto usa-footer__primary-content">
                  <a class="usa-footer__primary-link" href="#!">Primary link</a>
                </li>
              </ul>
            </nav>
          </div>
          <div class="mobile-lg:grid-col-4">
            <address class="usa-footer__address">
              <div class="grid-row grid-gap">
                <div class="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                  <div class="usa-footer__contact-info">
                    <a href="tel:1-800-555-5555">(800) CALL-GOVT</a>
                  </div>
                </div>
                <div class="grid-col-auto mobile-lg:grid-col-12 desktop:grid-col-auto">
                  <div class="usa-footer__contact-info">
                    <a href="#!">info@agency.gov</a>
                  </div>
                </div>
              </div>
            </address>
          </div>
        </div>
      </div>
    `;
  }

  // Secondary section - varies slightly by variant
  let secondarySection;

  if (variant === "Slim") {
    // Slim variant has simplified secondary section (no social links, no contact)
    secondarySection = html`
      <div class="usa-footer__secondary-section">
        <div class="grid-container">
          <div class="usa-footer__logo grid-row grid-gap-2">
            <div class="grid-col-auto">
              <img class="usa-footer__logo-img" src="./img/logo-img.png" alt="" />
            </div>
            <div class="grid-col-auto">
              <h3 class="usa-footer__logo-heading">Name of Agency</h3>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    // Default and Big variants have full secondary section
    secondarySection = html`
      <div class="usa-footer__secondary-section">
        <div class="grid-container">
          <div class="grid-row grid-gap">
            <div class="usa-footer__logo grid-row mobile-lg:grid-col-6 mobile-lg:grid-gap-2">
              <div class="mobile-lg:grid-col-auto">
                <img class="usa-footer__logo-img" src="./img/logo-img.png" alt="" />
              </div>
              <div class="mobile-lg:grid-col-auto">
                <h3 class="usa-footer__logo-heading">Name of Agency</h3>
              </div>
            </div>
            <div class="usa-footer__contact-links mobile-lg:grid-col-6">
              <div class="usa-footer__social-links grid-row grid-gap-1">
                <div class="grid-col-auto">
                  <a class="usa-social-link usa-social-link--facebook" href="#!">
                    <img
                      class="usa-social-link__icon"
                      src="./img/usa-icons/facebook.svg"
                      alt="Facebook"
                    />
                  </a>
                </div>
                <div class="grid-col-auto">
                  <a class="usa-social-link usa-social-link--rss" href="#!">
                    <img
                      class="usa-social-link__icon"
                      src="./img/usa-icons/rss_feed.svg"
                      alt="RSS"
                    />
                  </a>
                </div>
              </div>
              <h3 class="usa-footer__contact-heading">Agency Contact Center</h3>
              <address class="usa-footer__address">
                <div class="usa-footer__contact-info grid-row grid-gap">
                  <div class="grid-col-auto">
                    <a href="tel:1-800-555-5555">(800) CALL-GOVT</a>
                  </div>
                  <div class="grid-col-auto">
                    <a href="mailto:info@agency.gov">info@agency.gov</a>
                  </div>
                </div>
              </address>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  return html`
    <footer class="${footerClass}">${returnToTop} ${primarySection} ${secondarySection}</footer>
  `;
};

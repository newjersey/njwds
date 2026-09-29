import { html } from "lit";

import { LanguageSelector } from "../LanguageSelector/LanguageSelector";

export interface HeaderProps {
  variant: "Default" | "Extended";
  megamenu: boolean;
  languageSelector?: boolean;
  toggleValue?: string;
}

export const Header = ({ variant, megamenu, languageSelector, toggleValue }: HeaderProps) => {
  // Creates a unique ID for toggles to work for "docs" view in Storybook
  const instanceId = toggleValue ?? `acc-${crypto.randomUUID()}`;
  const navigationId = `primary-navigation-${instanceId}`;

  const searchform = html`
    <form class="usa-search usa-search--small" role="search">
      <label class="usa-sr-only" for="basic-search-field-small">Search small</label>
      <input class="usa-input" id="basic-search-field-small" type="search" name="search" />
      <button class="usa-button" type="submit">
        <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
          <use href="./img/sprite.svg#search"></use>
        </svg>
        <span class="usa-sr-only">Submit search</span>
      </button>
    </form>
  `;

  const closeButton = html`
    <button class="usa-nav__close" aria-label="Close navigation" aria-controls="${navigationId}">
      <svg class="usa-icon" aria-hidden="true" focusable="false" role="img">
        <use href="./img/sprite.svg#close"></use>
      </svg>
    </button>
  `;

  const megaMenuHtml = html`
    <button
      class="usa-accordion__button usa-nav__link usa-current"
      aria-expanded="false"
      aria-controls="basic-mega-nav-section-one-${instanceId}"
    >
      <span>Current</span>
    </button>
    <div id="basic-mega-nav-section-one-${instanceId}" class="usa-nav__submenu usa-megamenu" hidden>
      <div class="grid-row grid-gap-4">
        <div class="usa-col">
          <ul class="usa-nav__submenu-list">
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
          </ul>
        </div>
        <div class="usa-col">
          <ul class="usa-nav__submenu-list">
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#" class="">A very long navigation link that goes onto two lines</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
          </ul>
        </div>
        <div class="usa-col">
          <ul class="usa-nav__submenu-list">
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
            <li class="usa-nav__submenu-item">
              <a href="#" class="">Navigation link</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  `;

  const simpleMenuHtml = html`
    <button
      class="usa-accordion__button usa-nav__link usa-current"
      aria-expanded="false"
      aria-controls="basic-nav-section-one-${instanceId}"
    >
      <span>Current</span>
    </button>
    <ul id="basic-nav-section-one-${instanceId}" class="usa-nav__submenu" hidden>
      <li class="usa-nav__submenu-item">
        <a href="#" class=""> Navigation link</a>
      </li>
      <li class="usa-nav__submenu-item">
        <a href="#" class=""> Navigation link</a>
      </li>
      <li class="usa-nav__submenu-item">
        <a href="#" class=""> Navigation link</a>
      </li>
    </ul>
  `;

  const menuHtml = megamenu === true ? megaMenuHtml : simpleMenuHtml;
  const languageSelectorHtml = languageSelector
    ? LanguageSelector({
        pattern: "dropdown",
        buttonType: "tertiary",
        icon: true,
      })
    : "";

  const defaultHTML = html`
    <div class="usa-overlay"></div>
    <header class="usa-header usa-header--basic">
      <div class="usa-nav-container">
        <div class="usa-navbar">
          <div class="usa-logo" id="basic-logo">
            <em class="usa-logo__text"
              ><a href="/" title="Home" aria-label="Home">Project title</a></em
            >
          </div>
          <!--usa-logo-->
          <button class="usa-menu-btn" aria-controls="${navigationId}">Menu</button>
        </div>
        <!--/.usa-navbar-->
        <nav id="${navigationId}" aria-label="Primary navigation" class="usa-nav">
          ${closeButton}
          <ul class="usa-nav__primary usa-accordion">
            <li class="usa-nav__primary-item">${menuHtml}</li>
            <li class="usa-nav__primary-item">
              <a class="usa-nav__link" href="#!"><span>Link</span></a>
            </li>
            <li class="usa-nav__primary-item">
              <a class="usa-nav__link" href="#!"><span>Link</span></a>
            </li>
            ${languageSelector
              ? html`<li class="usa-nav__primary-item">${languageSelectorHtml}</li>`
              : ""}
          </ul>
          ${searchform}
        </nav>
        <!--/.usa-nav-->
      </div>
      <!--/.usa-nav-container-->
    </header>
    <!--/.usa-header-->
  `;

  const extendedHTML = html` <div class="usa-overlay"></div>
    <header class="usa-header usa-header--extended">
      <div class="usa-nav-container">
        <div class="usa-navbar">
          <div class="usa-logo" id="extended-logo">
            <em class="usa-logo__text"
              ><a href="/" title="Home" aria-label="Home">Project title</a></em
            >
          </div>
          <!--/.usa-logo-->
          <button class="usa-menu-btn" aria-controls="${navigationId}">Menu</button>
        </div>
        <!--/.usa-navbar-->
        <nav id="${navigationId}" aria-label="Primary navigation" class="usa-nav">
          <div class="usa-nav__inner">
            ${closeButton}
            <ul class="usa-nav__primary usa-accordion">
              <li class="usa-nav__primary-item">${menuHtml}</li>
              <li class="usa-nav__primary-item">
                <a class="usa-nav__link" href="#!"><span>Link</span></a>
              </li>
              <li class="usa-nav__primary-item">
                <a class="usa-nav__link" href="#!"><span>Link</span></a>
              </li>
              ${languageSelector
                ? html`<li class="usa-nav__primary-item">${languageSelectorHtml}</li>`
                : ""}
            </ul>
            <!--/.usa-nav__primary -->
            <div class="usa-nav__secondary">
              <ul class="usa-nav__secondary-links">
                <li class="usa-nav__secondary-item">
                  <a href="#!">Secondary link</a>
                </li>
                <li class="usa-nav__secondary-item">
                  <a href="#!">Another secondary link</a>
                </li>
              </ul>
              ${searchform}
            </div>
            <!--/.usa-nav__secondary-->
          </div>
          <!--/.usa-nav__inner-->
        </nav>
        <!--/.usa-nav-->
      </div>
      <!--/.usa-nav-container-->
    </header>
    <!--/.usa-header-->`;

  return html` ${variant === "Default" ? defaultHTML : extendedHTML} `;
};

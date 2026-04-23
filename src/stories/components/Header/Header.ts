import { html } from "lit";

export interface HeaderProps {
  variant: "Default" | "Extended";
  megamenu?: boolean;
}

export const Header = ({ variant, megamenu }: HeaderProps) => {
  const megaMenuHtml = html`
    <button
      class="usa-accordion__button usa-nav__link  usa-current"
      aria-expanded="false"
      aria-controls="basic-mega-nav-section-one"
    >
      <span>Current section</span>
    </button>
    <div id="basic-mega-nav-section-one" class="usa-nav__submenu usa-megamenu">
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
      class="usa-accordion__button usa-nav__link  usa-current"
      aria-expanded="false"
      aria-controls="basic-nav-section-one"
    >
      <span>Current</span>
    </button>
    <ul id="basic-nav-section-one" class="usa-nav__submenu">
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
          <button class="usa-menu-btn">Menu</button>
        </div>
        <nav aria-label="Primary navigation" class="usa-nav">
          <button class="usa-nav__close">
            <img src="img/close.svg" role="img" alt="close" />
          </button>
          <ul class="usa-nav__primary usa-accordion">
            <li class="usa-nav__primary-item">${menuHtml}</li>
            <li class="usa-nav__primary-item">
              <a class="usa-nav__link" href="#!"><span>Link</span></a>
            </li>
            <li class="usa-nav__primary-item">
              <a class="usa-nav__link" href="#!"><span>Link</span></a>
            </li>
          </ul>
          <form class="usa-search usa-search--small" role="search">
            <label class="usa-sr-only" for="basic-search-field-small">Search small</label>
            <input class="usa-input" id="basic-search-field-small" type="search" name="search" />
            <button class="usa-button" type="submit">
              <img
                src="/dist/img/usa-icons-bg/search--white.svg"
                class="usa-search__submit-icon"
                alt="Search"
              />
            </button>
          </form>
        </nav>
      </div>
    </header>
  `;

  const extendedHTML = html` <div class="usa-overlay"></div> `;

  return html` ${variant === "Default" ? defaultHTML : extendedHTML} `;
};

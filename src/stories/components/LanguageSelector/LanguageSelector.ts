import { html } from "lit";

export interface LanguageSelectorProps {
  pattern: "simple" | "dropdown";
  buttonType: string;
  icon: boolean;
}

export const LanguageSelector = ({ pattern, buttonType, icon }: LanguageSelectorProps) => {
  const buttonTypeClass =
    buttonType === "secondary" ? "usa-button--outline" : "usa-button--unstyled";

  // Simple toggle button pattern (USWDS doesn't provide JS for this - it's meant to link to another page)
  // We add a click handler for demo purposes in Storybook
  const handleSimpleToggle = (e: Event) => {
    const button = e.currentTarget as HTMLButtonElement;
    const span = button.querySelector("span");
    if (span?.lang === "en") {
      span.lang = "es";
      span.setAttribute("xml:lang", "es");
      span.textContent = "Español";
    } else if (span) {
      span.lang = "en";
      span.setAttribute("xml:lang", "en");
      span.textContent = "English";
    }
  };

  if (pattern === "simple") {
    return html`
      <div class="usa-language-container padding-2">
        <button type="button" class="usa-button ${buttonTypeClass}" @click=${handleSimpleToggle}>
          <span lang="en" xml:lang="en">English</span>
          ${icon
            ? html`<svg aria-hidden="true" focusable="false" role="img" class="usa-icon">
                <use xlink:href="./img/sprite.svg#language"></use>
              </svg>`
            : ""}
        </button>
      </div>
    `;
  }

  // Dropdown menu pattern (uses USWDS JavaScript)
  return html`
    <div class="usa-language-container padding-2">
      <ul class="usa-language__primary usa-accordion">
        <li class="usa-language__primary-item">
          <button
            class="usa-button usa-language__link ${buttonTypeClass}"
            aria-expanded="false"
            aria-controls="language-options"
          >
            Languages
            ${icon
              ? html`
                  <svg aria-hidden="true" focusable="false" role="img" class="usa-icon">
                    <use xlink:href="./img/sprite.svg#language"></use>
                  </svg>
                `
              : ""}
          </button>
          <ul id="language-options" class="usa-language__submenu" hidden>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="ar" xml:lang="ar"><strong>العربية</strong> (Arabic)</span></a
              >
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="zh" xml:lang="zh"
                  ><strong>简体字</strong> (Chinese - Simplified)</span
                ></a
              >
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="en" xml:lang="en"><strong>English</strong></span></a
              >
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="es" xml:lang="es"><strong>Español</strong> (Spanish)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="fr" xml:lang="fr"><strong>Français</strong> (French)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="it" xml:lang="it"><strong>Italiano</strong> (Italian)</span></a
              >
            </li>
          </ul>
          <!--/.language__submenu-->
        </li>
        <!--/.usa-language__primary-item-->
      </ul>
      <!--/.usa-language__primary-->
    </div>
    <!--/.usa-language-container-->
  `;
};

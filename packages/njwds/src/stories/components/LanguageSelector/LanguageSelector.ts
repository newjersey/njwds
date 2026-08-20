import { html } from "lit";

export interface LanguageSelectorProps {
  pattern: "simple" | "dropdown";
  buttonType: string;
  icon: boolean;
}

export const LanguageSelector = ({ pattern, buttonType, icon }: LanguageSelectorProps) => {
  const buttonTypeClass =
    buttonType === "secondary" ? "usa-button--outline" : "usa-button--unstyled";

  if (pattern === "simple") {
    return html`
      <div class="usa-language-container padding-2">
        <!-- The aria label says "Change language to Spanish" -->
        <a
          href="#"
          class="usa-button ${buttonTypeClass}"
          aria-label="Cambiar el idioma a español"
          lang="es"
        >
          <span lang="es">Español</span>
          ${icon
            ? html`<svg aria-hidden="true" focusable="false" role="img" class="usa-icon">
                <use href="./img/sprite.svg#language"></use>
              </svg>`
            : ""}
        </a>
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
            aria-label="Change the language of this page"
          >
            Languages
            ${icon
              ? html`
                  <svg aria-hidden="true" focusable="false" role="img" class="usa-icon">
                    <use href="./img/sprite.svg#language"></use>
                  </svg>
                `
              : ""}
          </button>
          <ul id="language-options" class="usa-language__submenu" hidden>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="en"><strong>English</strong></span></a
              >
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="es"><strong>Español</strong> (Spanish)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="fr"><strong>Français</strong> (French)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!"
                ><span lang="it"><strong>Italiano</strong> (Italian)</span></a
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

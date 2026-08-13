import { html } from "lit";

export interface LanguageSelectorProps {
  pattern: "simple" | "dropdown";
  buttonType: string;
  icon: boolean;
  instanceId?: string;
}

export const LanguageSelector = ({
  pattern,
  buttonType,
  icon,
  instanceId = crypto.randomUUID(),
}: LanguageSelectorProps) => {
  const buttonTypeClass =
    buttonType === "secondary" ? "usa-button--outline" : "usa-button--unstyled";
  const languageOptionsId = `language-options-${instanceId}`;

  if (pattern === "simple") {
    return html`
      <div class="usa-language-container padding-2">
        <!-- The aria label says "Change language to Spanish" -->
        <a
          href="#"
          class="usa-button ${buttonTypeClass}"
          aria-label="Cambiar el idioma a español"
          lang="es"
          hreflang="es"
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
            aria-controls="${languageOptionsId}"
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
          <ul id="${languageOptionsId}" class="usa-language__submenu" hidden>
            <li class="usa-language__submenu-item">
              <a href="#!" hreflang="en" aria-current="page">
                <span lang="en" dir="ltr"><strong>English</strong></span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!" hreflang="es">
                <span lang="es" dir="ltr"><strong>Español</strong></span>
                <span lang="en" dir="ltr">(Spanish)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!" hreflang="fr">
                <span lang="fr" dir="ltr"><strong>Français</strong></span>
                <span lang="en" dir="ltr">(French)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!" hreflang="it">
                <span lang="it" dir="ltr"><strong>Italiano</strong></span>
                <span lang="en" dir="ltr">(Italian)</span>
              </a>
            </li>
            <li class="usa-language__submenu-item">
              <a href="#!" hreflang="ar">
                <span lang="ar" dir="rtl"><strong>العربية</strong></span>
                <span lang="en" dir="ltr">(Arabic)</span>
              </a>
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

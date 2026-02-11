import { html } from "lit";

type ButtonTheme = "light" | "dark" | "danger";
type ButtonType = "primary" | "secondary" | "tertiary";
type NonLightTheme = Exclude<ButtonTheme, "light">;

export interface ButtonProps {
  label: string;
  type?: ButtonType;
  theme?: ButtonTheme;
  icon?: boolean;
}

export const Button = ({ label, type = "primary", theme = "light", icon = false }: ButtonProps) => {
  const typeClasses: Record<ButtonType, string> = {
    primary: "",
    secondary: "usa-button--outline",
    tertiary: "usa-button--unstyled",
  };

  const themeClasses: Record<NonLightTheme, Record<ButtonType, string>> = {
    dark: {
      primary: "nj-button--primary-dark",
      secondary: "usa-button--inverse",
      tertiary: "nj-button--unstyled-dark",
    },
    danger: {
      primary: "usa-button--secondary",
      secondary: "nj-button--outline-danger",
      tertiary: "nj-button--unstyled-danger",
    },
  };

  const buttonType = typeClasses[type];

  const buttonTheme = theme !== "light" ? themeClasses[theme][type] : "";

  return html`
    <button
      type="button"
      class=${["usa-button", buttonType, icon && "nj-button--icon", buttonTheme]
        .filter(Boolean)
        .join(" ")}
    >
      ${label}
      ${icon
        ? html`
            <svg class="usa-icon usa-icon--size-3" aria-hidden="true" focusable="false">
              <use href="./img/sprite.svg#accessibility_new"></use>
            </svg>
          `
        : null}
    </button>
  `;
};

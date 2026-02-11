import { html } from "lit";

type ButtonTheme = "light" | "dark" | "danger";
type ButtonType = "primary" | "outline" | "unstyled";
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
    outline: "usa-button--outline",
    unstyled: "usa-button--unstyled",
  };

  const themeClasses: Record<NonLightTheme, Record<ButtonType, string>> = {
    dark: {
      primary: "nj-button--primary-dark",
      outline: "usa-button--inverse",
      unstyled: "nj-button--unstyled-dark",
    },
    danger: {
      primary: "usa-button--secondary",
      outline: "nj-button--outline-danger",
      unstyled: "nj-button--unstyled-danger",
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

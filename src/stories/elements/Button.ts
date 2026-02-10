import { html } from "lit";

export interface ButtonProps {
  primary?: boolean;
  type?: "light" | "dark";
  label: string;
}
/** Primary UI component for user interaction */
export const Button = ({ primary, type, label }: ButtonProps) => {
  const mode = primary ? "" : "nj-button--primary-dark";

  return html`
    <button
      type="button"
      class=${["usa-button", `usa-button--${type || "medium"}`, mode].join(" ")}
    >
      ${label}
    </button>
  `;
};

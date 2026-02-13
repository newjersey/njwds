import { html } from "lit";

type LinkTheme = "light" | "dark";

export interface LinkProps {
  label: string;
  external?: boolean;
  theme?: LinkTheme;
}

export const Link = ({ label, theme = "light", external = false }: LinkProps) => {
  // Just need something to trigger the theme change, nothing really to output
  const linkTheme = theme !== "light" ? "" : "";

  return html`
    <a
      href="!"
      class=${["usa-link", external && "usa-link--external", linkTheme].filter(Boolean).join(" ")}
      >${label}</a
    >
  `;
};

import { html } from "lit";

export interface LinkProps {
  label: string;
  mode: string;
  external?: boolean;
  forceVisited: boolean;
}

export const Link = ({ label, external, mode, forceVisited }: LinkProps) => {
  // Just need something to trigger the theme change, nothing really to output
  const modeSetting = mode === "dark" ? "usa-dark-background" : "";

  return html`
    <div class="${modeSetting}">
      <p>
        <a
          href="!#"
          class=${[
            "usa-link",
            external && "usa-link--external",
            forceVisited && "usa-color-text-visited",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          ${label}
        </a>
      </p>
    </div>
  `;
};

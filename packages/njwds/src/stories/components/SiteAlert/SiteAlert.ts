import { html } from "lit";

import { classNames } from "../../../utils/classNames";

export interface SiteAlertProps {
  heading: string;
  text: string;
  type: string;
  header: boolean;
  slim: boolean;
  icon: boolean;
  list: boolean;
}

const items = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
];

export const SiteAlert = ({ heading, text, type, header, slim, icon, list }: SiteAlertProps) => {
  const showHeader = slim ? false : header;
  const showList = slim ? false : list;

  return html`<section
    class=${classNames(
      "usa-site-alert",
      `usa-site-alert--${type}`,
      slim && "usa-site-alert--slim",
      !icon && "usa-site-alert--no-icon",
    )}
    aria-label="Site alert"
  >
    <div class="usa-alert">
      <div class="usa-alert__body">
        ${showHeader ? html`<h3 class="usa-alert__heading">${heading}</h3>` : null}
        ${
          showList
            ? html`<ul class="usa-list">
                ${items.map((item) => html`<li>${item}</li>`)}
              </ul>`
            : html`<p class="usa-alert__text">${text}</p>`
        }
      </div>
    </div>
  </section>`;
};

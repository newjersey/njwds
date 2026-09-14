import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface AccordionProps {
  bordered: boolean;
  toggleValue?: string;
  allowMultiple: boolean;
}

const items = [
  {
    title: "First",
    expanded: true,
    content: `<p>Accordion content for the first item.</p>`,
  },
  {
    title: "Second",
    expanded: false,
    content: `<p>Accordion content for the second item.</p>`,
  },
  {
    title: "Third",
    expanded: false,
    content: `<p>Accordion content for the third item.</p>`,
  },
];

export const Accordion = ({ bordered, toggleValue, allowMultiple }: AccordionProps) => {
  const classes = ["usa-accordion", bordered && "usa-accordion--bordered"]
    .filter(Boolean)
    .join(" ");

  // Unique per call to Accordion needed so the `name` attribute grouping
  // `<details>` elements doesn't collide across instances inside Storybook.
  const instanceId = toggleValue ?? `acc-${crypto.randomUUID()}`;

  return html`
    <div class=${classes}>
      ${items.map(
        (item) => html`
          <details ?open=${item.expanded} ?name=${allowMultiple ? "" : instanceId}>
            <summary class="usa-accordion__button">
              <h2 class="usa-accordion__heading">${item.title}</h2>
            </summary>
            <div class="usa-accordion__content usa-prose">${unsafeHTML(item.content)}</div>
          </details>
        `,
      )}
    </div>
  `;
};

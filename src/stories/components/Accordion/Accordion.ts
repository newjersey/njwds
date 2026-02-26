import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface AccordionProps {
  bordered: boolean;
  toggleValue?: string;
}

const items = [
  {
    title: "First",
    id: "a1",
    expanded: true,
    content: `<p>Accordion content for the first item.</p>`,
  },
  {
    title: "Second",
    id: "a2",
    expanded: false,
    content: `<p>Accordion content for the second item.</p>`,
  },
  {
    title: "Third",
    id: "a3",
    expanded: false,
    content: `<p>Accordion content for the third item.</p>`,
  },
];

export const Accordion = ({ bordered, toggleValue }: AccordionProps) => {
  const classes = ["usa-accordion", bordered && "usa-accordion--bordered"]
    .filter(Boolean)
    .join(" ");

  // Unique per call to Accordion needed because the `id` of the content divs
  // must be unique to ensure correct aria-controls behavior inside Storybook.
  const instanceId = toggleValue ?? `acc-${crypto.randomUUID()}`;

  return html`
    <div class=${classes}>
      ${items.map(
        (item) => html`
          <h2 class="usa-accordion__heading">
            <button
              type="button"
              class="usa-accordion__button"
              aria-expanded=${item.expanded ? "true" : "false"}
              aria-controls="${item.id}-${instanceId}"
            >
              ${item.title}
            </button>
          </h2>
          <div
            id="${item.id}-${instanceId}"
            class="usa-accordion__content usa-prose"
            ?hidden=${!item.expanded}
          >
            ${unsafeHTML(item.content)}
          </div>
        `,
      )}
    </div>
  `;
};

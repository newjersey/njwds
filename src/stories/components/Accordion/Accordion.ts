import { html } from "lit";
import { unsafeHTML } from "lit/directives/unsafe-html.js";

export interface AccordionProps {
  bordered: boolean;
}

const items = [
  {
    title: "First Amendment",
    id: "a1",
    expanded: true,
    content: `<p>Congress shall make no law respecting an establishment of religion, or prohibiting the free exercise thereof; or abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances.</p>`,
  },
  {
    title: "Second Amendment",
    id: "a2",
    expanded: false,
    content: `<p>A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.</p> <ul><li>This is a list item</li><li>Another list item</li></ul>`,
  },
  {
    title: "Third Amendment",
    id: "a3",
    expanded: false,
    content: `<p>No Soldier shall, in time of peace be quartered in any house, without the consent of the Owner, nor in time of war, but in a manner to be prescribed by law.</p>`,
  },
];

export const Accordion = ({ bordered }: AccordionProps) => {
  const classes = ["usa-accordion", bordered && "usa-accordion--bordered"]
    .filter(Boolean)
    .join(" ");

  return html`
    <div class=${classes}>
      ${items.map(
        (item) => html`
          <h2 class="usa-accordion__heading">
            <button
              type="button"
              class="usa-accordion__button"
              aria-expanded=${item.expanded ? "true" : "false"}
              aria-controls=${item.id}
            >
              ${item.title}
            </button>
          </h2>
          <div id=${item.id} class="usa-accordion__content usa-prose" ?hidden=${!item.expanded}>
            ${unsafeHTML(item.content)}
          </div>
        `,
      )}
    </div>
  `;
};

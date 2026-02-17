import { html } from "lit";

type ListType = "Unordered List" | "Ordered List";

export interface ListProps {
  label: string;
  unstyled?: boolean;
  type?: ListType;
}

export const List = ({ label, type = "Unordered List", unstyled = false }: ListProps) => {
  const className = ["usa-list", unstyled && "usa-list--unstyled"].filter(Boolean).join(" ");
  const items = Array.from({ length: 4 }, () => html`<li>${label}</li>`);
  const content = html`${items}`;

  return type === "Ordered List"
    ? html`<ol class=${className}>
        ${content}
      </ol>`
    : html`<ul class=${className}>
        ${content}
      </ul>`;
};

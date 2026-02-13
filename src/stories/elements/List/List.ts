import { html } from "lit";

type ListType = "Unordered List" | "Ordered List";

export interface ListProps {
  label: string;
  styled?: boolean;
  type?: ListType;
}

export const List = ({ label, type = "Unordered List", styled = false }: ListProps) => {
  if (type === "Ordered List") {
    return html`
      <ol class=${["usa-list", styled && "usa-list--unstyled"].filter(Boolean).join(" ")}>
        <li>${label}</li>
        <li>${label}</li>
        <li>${label}</li>
        <li>${label}</li>
      </ol>
    `;
  } else {
    return html`
      <ul class=${["usa-list", styled && "usa-list--unstyled"].filter(Boolean).join(" ")}>
        <li>${label} - ${type}</li>
        <li>${label}</li>
        <li>${label}</li>
        <li>${label}</li>
      </ul>
    `;
  }
};

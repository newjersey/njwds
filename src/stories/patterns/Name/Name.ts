import { html } from "lit";

export interface NameProps {
  class?: string;
}

export const Name = ({ class: className }: NameProps) => {
  return html` HTML HERE ${className} `;
};

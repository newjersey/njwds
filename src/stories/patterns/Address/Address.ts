import { html } from "lit";

export interface AddressProps {
  class?: string;
}

export const Address = ({ class: className }: AddressProps) => {
  return html` HTML HERE ${className} `;
};

import { html } from "lit";

export interface DateProps {
  class?: string;
}

export const Date = ({ class: className }: DateProps) => {
  return html` HTML HERE ${className} `;
};

import { html } from "lit";

export interface TimeProps {
  class?: string;
}

export const Time = ({ class: className }: TimeProps) => {
  return html` HTML HERE ${className} `;
};

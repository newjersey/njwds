import { html } from "lit";

export interface PasswordProps {
  class?: string;
}

export const Password = ({ class: className }: PasswordProps) => {
  return html` HTML HERE ${className} `;
};

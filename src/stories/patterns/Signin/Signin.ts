import { html } from "lit";

export interface SigninProps {
  class?: string;
}

export const Signin = ({ class: className }: SigninProps) => {
  return html` HTML HERE ${className} `;
};

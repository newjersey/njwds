import { html } from "lit";

export interface AlertProps {
  heading: string;
  text: string;
  type: string;
  header: boolean;
  slim: boolean;
  icon: boolean;
}

export const Alert = ({ heading, text, type, header, slim, icon }: AlertProps) => {
  return html` <div class="usa-alert" role="alert">
    <div class="usa-alert__body">
      <h3 class="usa-alert__heading">${heading}</h3>
      <p class="usa-alert__text">${text}</p>
    </div>
  </div>`;
};

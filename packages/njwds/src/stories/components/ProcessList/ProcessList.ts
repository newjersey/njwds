import { html } from "lit";

export interface ProcessListComponentProps {
  content: boolean;
  customSizing: boolean;
}

export const ProcessListComponent = ({ content, customSizing }: ProcessListComponentProps) => {
  const customSizingClass = customSizing ? "font-sans-xl line-height-sans-1" : "";
  const customSizingParagraph = customSizing ? "font-sans-lg margin-top-1 text-light" : "";
  const contentHtml = content
    ? html` <li class="usa-process-list__item">
        <h4 class="usa-process-list__heading ${customSizingClass}">Proceed to the second step</h4>
        <p class="${customSizingParagraph}">
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi commodo, ipsum sed
          pharetra gravida, orci magna rhoncus neque, id pulvinar odio lorem non turpis. Nullam sit
          amet enim.
        </p>
      </li>`
    : html`
        <li class="usa-process-list__item padding-bottom-4">
          <p class="usa-process-list__heading ${customSizingClass}">Proceed to the second step.</p>
        </li>
      `;

  return html`
    <ol class="usa-process-list">
      ${contentHtml} ${contentHtml} ${contentHtml}
    </ol>
  `;
};

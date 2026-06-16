import { html } from "lit";

export interface TooltipProps {
  content: string;
  label: string;
}

export const Tooltip = () => {
  return html`
    <div class="padding-8 text-center">
      <div class="margin-4">
        <button
          type="button"
          class="usa-button usa-tooltip"
          data-position="left"
          title="Tooltip content"
        >
          Show on left
        </button>
        <button
          type="button"
          class="usa-button usa-tooltip"
          data-position="top"
          title="Tooltip content"
        >
          Show on top
        </button>

        <button
          type="button"
          class="usa-button usa-tooltip"
          data-position="bottom"
          title="Tooltip content"
        >
          Show on bottom
        </button>
        <button
          type="button"
          class="usa-button usa-tooltip"
          data-position="right"
          title="Tooltip content"
        >
          Show on right
        </button>
      </div>
    </div>
  `;
};

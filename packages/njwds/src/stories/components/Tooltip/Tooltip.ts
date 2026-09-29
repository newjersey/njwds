import { html } from "lit";

export interface TooltipProps {
  content: string;
  label: string;
}

export const Tooltip = () => {
  return html`
    <div class="grid-row padding-8">
      <div class="tablet:grid-col-3 margin-top-2 text-center">
          <button
            type="button"
            class="usa-button usa-tooltip"
            data-position="right"
            data-classes="width-full tablet:width-auto"
            title="Tooltip content"
          >
            Show on right
          </button>
        </div>
        <div class="tablet:grid-col-3 margin-top-2 text-center">
          <button
            type="button"
            class="usa-button usa-tooltip"
            data-position="top"
            data-classes="width-full tablet:width-auto"
            title="Tooltip content"
          >
            Show on top
          </button>
        </div>
        <div class="tablet:grid-col-3 margin-top-2 text-center">
          <button
            type="button"
            class="usa-button usa-tooltip"
            data-position="bottom"
            data-classes="width-full tablet:width-auto"
            title="Tooltip content"
          >
            Show on bottom
          </button>
        </div>
        <div class="tablet:grid-col-3 margin-top-2 text-center">
          <button
            type="button"
            class="usa-button usa-tooltip"
            data-position="left"
            data-classes="width-full tablet:width-auto"
            title="Tooltip content"
          >
            Show on left
          </button>
        </div>
      </div>
    </div>
  `;
};

import { html } from "lit";

export const AspectRatio = () => {
  return html`
    <div class="add-aspect-16x9 bg-primary-lighter margin-y-7">
      <div class="aspect-example__inner">16x9</div>
    </div>

    <div class="add-aspect-4x3 bg-primary-lighter margin-y-7">
      <div class="aspect-example__inner">4x3</div>
    </div>

    <div class="add-aspect-9x16 aspect-example bg-primary-lighter margin-y-7">
      <div class="aspect-example__inner">9x16</div>
    </div>

    <div class="add-aspect-1x1 bg-primary-lighter margin-y-7">
      <div class="aspect-example__inner">1x1</div>
    </div>

    <div class="add-aspect-2x1 bg-primary-lighter margin-y-7">
      <div class="aspect-example__inner">2x1</div>
    </div>
  `;
};

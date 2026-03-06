import { html } from "lit";

export const File = () => {
  return html`
    <form class="usa-form">
      <label class="usa-label" for="file-html">File input label</label>
      <input class="usa-input" id="file-html" name="input-type-file" type="file" />
    </form>
  `;
};

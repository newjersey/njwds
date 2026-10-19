import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import sheet from "../../sass/web-components/nj-divider.scss?inline";

@customElement("nj-divider")
export class NjDivider extends LitElement {
  static styles = [unsafeCSS(sheet)];

  render() {
    return html`<hr />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "nj-divider": NjDivider;
  }
}

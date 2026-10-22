import { LitElement, html, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import sheet from "../../sass/web-components/grove-divider.scss?inline";

@customElement("grove-divider")
export class GroveDivider extends LitElement {
  static styles = [unsafeCSS(sheet)];

  render() {
    return html`<hr />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "grove-divider": GroveDivider;
  }
}

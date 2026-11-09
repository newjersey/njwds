import { LitElement, html, unsafeCSS } from "lit";
import { defineElement } from "../shared/define-element.js";
import hostStyles from "../web-styles.scss?inline";
import sheet from "./grove-divider.scss?inline";

export class GroveDivider extends LitElement {
  static override styles = [unsafeCSS(hostStyles), unsafeCSS(sheet)];

  override render() {
    return html`<hr class="grove-divider" />`;
  }
}

defineElement("grove-divider", GroveDivider);

declare global {
  interface HTMLElementTagNameMap {
    "grove-divider": GroveDivider;
  }
}

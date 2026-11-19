import { LitElement, html, unsafeCSS } from "lit";
import { defineElement } from "../shared/define-element.js";
import hostStyles from "../web-styles.scss?inline";
import sheet from "./grove-{{name}}.scss?inline";

export class Grove{{Name}} extends LitElement {
  static override styles = [unsafeCSS(hostStyles), unsafeCSS(sheet)];

  override render() {
    return html`<div class="grove-{{name}}"><slot></slot></div>`;
  }
}

defineElement("grove-{{name}}", Grove{{Name}});

declare global {
  interface HTMLElementTagNameMap {
    "grove-{{name}}": Grove{{Name}};
  }
}

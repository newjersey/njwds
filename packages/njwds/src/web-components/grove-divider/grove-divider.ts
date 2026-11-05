import { LitElement, html, unsafeCSS } from "lit";
import sheet from "./grove-divider.scss?inline";

export class GroveDivider extends LitElement {
  static override styles = [unsafeCSS(sheet)];

  override render() {
    return html`<hr />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "grove-divider": GroveDivider;
  }
}

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "grove-divider": import("react").DetailedHTMLProps<
        import("react").HTMLAttributes<GroveDivider>,
        GroveDivider
      >;
    }
  }
}

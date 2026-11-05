import { GroveDivider } from "./grove-divider";

if (!customElements.get("grove-divider")) {
  customElements.define("grove-divider", GroveDivider);
}

export { GroveDivider };

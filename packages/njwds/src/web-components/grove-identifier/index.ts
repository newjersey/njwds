import { GroveIdentifier } from "./grove-identifier";

if (!customElements.get("grove-identifier")) {
  customElements.define("grove-identifier", GroveIdentifier);
}

export { GroveIdentifier };
export { defaultIdentifierLinks } from "./grove-identifier.content";
export type {
  IdentifierContent,
  IdentifierContentOverrides,
  IdentifierLink,
} from "./grove-identifier.content";
export type { LogoInfo } from "./grove-identifier";

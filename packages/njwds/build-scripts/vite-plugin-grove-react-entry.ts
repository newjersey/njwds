/**
 * Vite plugin providing the @newjersey/njwds/react build entry
 *
 * Serves a virtual module, `virtual:grove-react`, that re-exports every web
 * component's React wrapper (<tag>/<tag>.react.ts). It is built in the same
 * Vite build as the web component entries, so the element classes are shared
 * between the two outputs rather than duplicated (a second copy would call
 * customElements.define for the same tag again and throw).
 */

import type { Plugin } from "vite";
import { listWebComponentNames, webComponentReactIndexContent } from "./web-components.ts";

export const GROVE_REACT_ENTRY_ID = "virtual:grove-react";

// The \0 prefix tells other plugins this id isn't a file on disk
const RESOLVED_ID = "\0" + GROVE_REACT_ENTRY_ID;

export function groveReactEntryPlugin(webComponentsDir: string): Plugin {
  return {
    name: "grove-react-entry",

    resolveId(id) {
      return id === GROVE_REACT_ENTRY_ID ? RESOLVED_ID : null;
    },

    load(id) {
      if (id !== RESOLVED_ID) return null;
      return webComponentReactIndexContent(
        listWebComponentNames(webComponentsDir),
        webComponentsDir,
      );
    },
  };
}

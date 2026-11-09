/**
 * Vite plugin providing the @newjersey/njwds/react build entry
 *
 * Serves a virtual module, `virtual:grove-react`, that re-exports every web
 * component's React wrapper (<tag>/<tag>.react.ts). It is built in the same
 * Vite build as the web component entries, so the element classes are shared
 * between the two outputs rather than duplicated (a second copy would be a
 * second class for the same tag, which defineElement can only warn about).
 */

import type { Plugin } from "vite";
import { resolvedVirtualId, virtualEntryPlugin } from "./vite-plugin-virtual-entry.ts";
import { listWebComponentNames, webComponentReactIndexContent } from "./web-components.ts";

export const GROVE_REACT_ENTRY_ID = "virtual:grove-react";

export function groveReactEntryPlugin(webComponentsDir: string): Plugin {
  return {
    ...virtualEntryPlugin("grove-react-entry", GROVE_REACT_ENTRY_ID, () =>
      webComponentReactIndexContent(listWebComponentNames(webComponentsDir), webComponentsDir),
    ),

    // The wrappers use hooks, so React Server Components bundlers (e.g. Next.js App
    // Router) must load /react as a client module. Added as a banner rather than in
    // the module source, where Rolldown warns about module-level directives.
    banner(chunk) {
      return chunk.facadeModuleId === resolvedVirtualId(GROVE_REACT_ENTRY_ID)
        ? '"use client";'
        : "";
    },
  };
}

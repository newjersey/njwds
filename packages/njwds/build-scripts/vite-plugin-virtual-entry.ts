/**
 * Vite plugin serving a generated build entry under a virtual id
 *
 * Used for entries whose source is generated from the discovered web components
 * (the @newjersey/njwds/react entry and the CDN bundle), so adding a component
 * never means hand-editing an entry file.
 */

import type { Plugin } from "vite";

// The \0 prefix tells other plugins this id isn't a file on disk
export function resolvedVirtualId(id: string): string {
  return "\0" + id;
}

export function virtualEntryPlugin(name: string, id: string, source: () => string): Plugin {
  const resolvedId = resolvedVirtualId(id);

  return {
    name,

    resolveId(requestedId) {
      return requestedId === id ? resolvedId : null;
    },

    load(requestedId) {
      return requestedId === resolvedId ? source() : null;
    },
  };
}

/**
 * Tests for groveReactEntryPlugin's banner
 *
 * The React wrappers use hooks, so Next.js App Router (and any React Server
 * Components bundler) must treat @newjersey/njwds/react as a client module: a
 * Server Component page rendering <GroveDivider /> otherwise fails to build
 * ("useRef is not a function"). Only the /react entry gets the directive; the web
 * component chunks aren't React modules.
 */

import { describe, expect, test } from "vitest";
import type { RenderedChunk } from "rolldown";
import { GROVE_REACT_ENTRY_ID, groveReactEntryPlugin } from "./vite-plugin-grove-react-entry";

function bannerFor(facadeModuleId: string | null): string {
  const banner = groveReactEntryPlugin("/x").banner as (chunk: RenderedChunk) => string;
  return banner({ facadeModuleId } as RenderedChunk);
}

describe("groveReactEntryPlugin banner", () => {
  test('marks the /react entry chunk "use client"', () => {
    expect(bannerFor("\0" + GROVE_REACT_ENTRY_ID)).toBe('"use client";');
  });

  test("leaves web component entries and shared chunks without a directive", () => {
    expect(bannerFor("/x/grove-divider/index.ts")).toBe("");
    expect(bannerFor(null)).toBe("");
  });
});

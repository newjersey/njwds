/**
 * Tests for virtualEntryPlugin
 *
 * The generated build entries (@newjersey/njwds/react and the CDN bundle) aren't
 * files on disk; this plugin serves their source to Vite under a virtual id.
 */

import { describe, expect, test } from "vitest";
import { virtualEntryPlugin } from "./vite-plugin-virtual-entry";

type Hook = (id: string) => string | null;

describe("virtualEntryPlugin", () => {
  const plugin = virtualEntryPlugin("test-entry", "virtual:test-entry", () => "export {};\n");
  const resolveId = plugin.resolveId as Hook;
  const load = plugin.load as Hook;

  test("resolves its virtual id to a \\0-prefixed id, and leaves other ids to other plugins", () => {
    expect(resolveId("virtual:test-entry")).toBe("\0virtual:test-entry");
    expect(resolveId("./grove-divider.js")).toBeNull();
  });

  test("loads the generated source only for its resolved id", () => {
    expect(load("\0virtual:test-entry")).toBe("export {};\n");
    expect(load("virtual:test-entry")).toBeNull();
  });
});

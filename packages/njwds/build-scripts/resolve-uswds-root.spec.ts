/**
 * Tests for resolveUswdsRoot
 *
 * The Sass load paths for both the package build and Storybook depend on finding
 * @uswds/uswds wherever npm placed it (hoisted to the repo root under workspaces).
 */

import { afterEach, describe, expect, test } from "vitest";
import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { resolveUswdsRoot } from "./resolve-uswds-root";

let isolatedDir: string | undefined;

afterEach(() => {
  if (isolatedDir) rmSync(isolatedDir, { recursive: true, force: true });
  isolatedDir = undefined;
});

describe("resolveUswdsRoot", () => {
  test("finds the installed @uswds/uswds package, including its Sass packages directory", () => {
    const uswdsRoot = resolveUswdsRoot(import.meta.url);

    expect(path.basename(uswdsRoot)).toBe("uswds");
    expect(existsSync(path.join(uswdsRoot, "packages", "uswds-core"))).toBe(true);
  });

  test("throws a clear error when no node_modules directory above the caller has it", () => {
    isolatedDir = mkdtempSync(path.join(tmpdir(), "grove-no-uswds-"));
    const callerUrl = pathToFileURL(path.join(isolatedDir, "caller.js")).href;

    expect(() => resolveUswdsRoot(callerUrl)).toThrow(
      "Could not locate @uswds/uswds in any node_modules directory",
    );
  });
});

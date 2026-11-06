/**
 * Tests for listWebComponentNames
 *
 * Its output drives both the Vite build entries (vite.config.grove.ts) and the
 * generated package entry point (index.js), so it decides what ships.
 */

import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { listWebComponentNames } from "./web-components";

let webComponentsDir: string;

function addDirectory(name: string, files: string[] = []) {
  mkdirSync(path.join(webComponentsDir, name));
  for (const file of files) {
    writeFileSync(path.join(webComponentsDir, name, file), "");
  }
}

beforeEach(() => {
  webComponentsDir = mkdtempSync(path.join(tmpdir(), "grove-web-components-"));
});

afterEach(() => {
  rmSync(webComponentsDir, { recursive: true, force: true });
});

describe("listWebComponentNames", () => {
  test("returns each grove-* directory that contains an index.ts entry, sorted", () => {
    addDirectory("grove-tabs", ["index.ts", "grove-tabs.ts"]);
    addDirectory("grove-divider", ["index.ts", "grove-divider.ts"]);

    expect(listWebComponentNames(webComponentsDir)).toEqual(["grove-divider", "grove-tabs"]);
  });

  test("ignores directories without the grove- prefix and loose files", () => {
    addDirectory("grove-divider", ["index.ts", "grove-divider.ts"]);
    addDirectory("shared", ["index.ts"]);
    writeFileSync(path.join(webComponentsDir, "web-styles.scss"), "");

    expect(listWebComponentNames(webComponentsDir)).toEqual(["grove-divider"]);
  });

  test("throws a clear error when a grove-* directory is missing its index.ts entry", () => {
    addDirectory("grove-divider", ["grove-divider.ts"]);

    expect(() => listWebComponentNames(webComponentsDir)).toThrow(
      /grove-divider.*missing index\.ts/,
    );
  });
});

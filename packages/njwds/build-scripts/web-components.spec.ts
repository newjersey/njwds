/**
 * Tests for listWebComponentNames and the generated entry point contents
 *
 * listWebComponentNames drives both the Vite build entries (vite.config.grove.ts)
 * and the generated package entry points, so it decides what ships;
 * webComponentIndexContent is the content of the root index.js, and the
 * webComponentReact* functions are the source and types of @newjersey/njwds/react.
 */

import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  listWebComponentNames,
  webComponentIndexContent,
  webComponentReactIndexContent,
  webComponentReactTypesContent,
} from "./web-components";

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

describe("webComponentIndexContent", () => {
  test("re-exports each component's built index.js, one line per component, in the given order", () => {
    expect(webComponentIndexContent(["grove-divider", "grove-tabs"])).toBe(
      'export * from "./dist/web-components/grove-divider/index.js";\n' +
        'export * from "./dist/web-components/grove-tabs/index.js";\n',
    );
  });
});

describe("webComponentReactIndexContent", () => {
  test("re-exports each component's React wrapper source, one line per component, in the given order", () => {
    expect(webComponentReactIndexContent(["grove-divider", "grove-tabs"], "/x")).toBe(
      'export * from "/x/grove-divider/grove-divider.react.ts";\n' +
        'export * from "/x/grove-tabs/grove-tabs.react.ts";\n',
    );
  });
});

describe("webComponentReactTypesContent", () => {
  test("re-exports each wrapper's emitted declarations, relative to dist/react/", () => {
    expect(webComponentReactTypesContent(["grove-divider"])).toBe(
      'export * from "../web-components/grove-divider/grove-divider.react.js";\n',
    );
  });
});

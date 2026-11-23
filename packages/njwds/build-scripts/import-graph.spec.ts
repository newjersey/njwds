/**
 * Tests for listBareImports
 *
 * listBareImports powers the guard that keeps React out of the web component
 * entries (react-wrappers.spec.ts), so it must follow every relative import an
 * entry can reach and report each package import it finds.
 */

import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { listBareImports } from "./import-graph";

let fixtureDir: string;

function writeFiles(files: Record<string, string>) {
  for (const [file, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(fixtureDir, file)), { recursive: true });
    writeFileSync(path.join(fixtureDir, file), content);
  }
}

beforeEach(() => {
  fixtureDir = mkdtempSync(path.join(tmpdir(), "grove-import-graph-"));
});

afterEach(() => {
  rmSync(fixtureDir, { recursive: true, force: true });
});

describe("listBareImports", () => {
  test("returns bare imports reachable through relative imports and re-exports, sorted and unique", () => {
    writeFiles({
      "index.ts": 'export { A } from "./a";\n',
      "a.ts": 'import { LitElement } from "lit";\nimport "./b";\nexport class A {}\n',
      "b.ts": 'import { html } from "lit";\nimport { customElement } from "lit/decorators.js";\n',
    });

    expect(listBareImports(path.join(fixtureDir, "index.ts"))).toEqual([
      "lit",
      "lit/decorators.js",
    ]);
  });

  test("resolves directory imports to index.ts", () => {
    writeFiles({
      "index.ts": 'export * from "./shared";\n',
      "shared/index.ts": 'import { css } from "lit";\n',
    });

    expect(listBareImports(path.join(fixtureDir, "index.ts"))).toEqual(["lit"]);
  });

  test("does not traverse stylesheet imports", () => {
    writeFiles({
      "index.ts": 'import sheet from "./x.scss?inline";\nexport { sheet };\n',
    });

    expect(listBareImports(path.join(fixtureDir, "index.ts"))).toEqual([]);
  });

  test("finds React when an entry re-exports a wrapper", () => {
    writeFiles({
      "index.ts": 'export * from "./x.react";\n',
      "x.react.ts":
        'import * as React from "react";\nimport { createComponent } from "@lit/react";\n',
    });

    expect(listBareImports(path.join(fixtureDir, "index.ts"))).toEqual(
      expect.arrayContaining(["react", "@lit/react"]),
    );
  });

  test("follows .js specifiers to their .ts source", () => {
    writeFiles({
      "index.ts": 'export * from "./x.react.js";\n',
      "x.react.ts": 'import * as React from "react";\n',
    });

    expect(listBareImports(path.join(fixtureDir, "index.ts"))).toEqual(["react"]);
  });

  test("throws when a relative import can't be resolved, instead of skipping it", () => {
    writeFiles({
      "index.ts": 'export * from "./missing";\n',
    });

    expect(() => listBareImports(path.join(fixtureDir, "index.ts"))).toThrow(
      /can't resolve "\.\/missing"/,
    );
  });
});

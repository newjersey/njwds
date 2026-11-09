/**
 * React wrapper guards
 *
 * Every web component ships a React wrapper (<tag>/<tag>.react.ts), which the
 * generated @newjersey/njwds/react entry re-exports. The wrapper imports React, so
 * a component's web component entry (index.ts) must never reach it: that entry is
 * what Vue, Angular, and plain-HTML consumers load, and React must not reach them.
 */

import { describe, expect, test } from "vitest";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { listBareImports } from "./import-graph";
import { listWebComponentNames } from "./web-components";

const webComponentsDir = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../src/web-components",
);
const webComponentNames = listWebComponentNames(webComponentsDir);
const REACT_PACKAGES = ["react", "react-dom", "react/jsx-runtime", "@lit/react"];

describe("React wrappers", () => {
  test.each(webComponentNames)("%s has a React wrapper", (name) => {
    expect(existsSync(path.join(webComponentsDir, name, `${name}.react.ts`))).toBe(true);
  });

  test.each(webComponentNames)("%s's web component entry can't reach React", (name) => {
    const bareImports = listBareImports(path.join(webComponentsDir, name, "index.ts"));

    expect(bareImports.filter((specifier) => REACT_PACKAGES.includes(specifier))).toEqual([]);
  });
});

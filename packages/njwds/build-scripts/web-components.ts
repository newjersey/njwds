import { existsSync, readdirSync } from "node:fs";
import path from "node:path";

const COMPONENT_DIRECTORY_PREFIX = "grove-";

/**
 * Lists the web components to build: every `grove-*` directory in webComponentsDir.
 * Other directories (e.g. shared helpers) and loose files are ignored. A `grove-*`
 * directory must contain an `index.ts` entry — the component's public surface,
 * re-exporting it and any sub-components — so a missing entry fails the build
 * instead of silently dropping the component from the package.
 */
export function listWebComponentNames(webComponentsDir: string): string[] {
  const names = readdirSync(webComponentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(COMPONENT_DIRECTORY_PREFIX))
    .map((entry) => entry.name)
    .sort();

  for (const name of names) {
    if (!existsSync(path.join(webComponentsDir, name, "index.ts"))) {
      throw new Error(
        `${path.join(webComponentsDir, name)} is missing index.ts — each ${COMPONENT_DIRECTORY_PREFIX}* directory must contain an index.ts entry`,
      );
    }
  }

  return names;
}

/**
 * Content of the generated package entry point (index.js and index.d.ts):
 * re-exports each component's built entry, in the order given.
 */
export function webComponentIndexContent(webComponentNames: string[]): string {
  return reExports(webComponentNames.map((name) => `./dist/web-components/${name}/index.js`));
}

/**
 * Source of the @newjersey/njwds/react build entry: re-exports each component's
 * React wrapper (<tag>/<tag>.react.ts), in the order given.
 */
export function webComponentReactIndexContent(
  webComponentNames: string[],
  webComponentsDir: string,
): string {
  return reExports(webComponentNames.map((name) => `${webComponentsDir}/${name}/${name}.react.ts`));
}

/**
 * Content of dist/react/index.d.ts: re-exports each wrapper's declarations, which
 * grove:build:types emits next to the component in dist/web-components/.
 */
export function webComponentReactTypesContent(webComponentNames: string[]): string {
  return reExports(webComponentNames.map((name) => `../web-components/${name}/${name}.react.js`));
}

function reExports(specifiers: string[]): string {
  return specifiers.map((specifier) => `export * from "${specifier}";`).join("\n") + "\n";
}

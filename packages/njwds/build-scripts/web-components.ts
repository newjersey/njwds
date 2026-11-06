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
  return (
    webComponentNames
      .map((name) => `export * from "./dist/web-components/${name}/index.js";`)
      .join("\n") + "\n"
  );
}

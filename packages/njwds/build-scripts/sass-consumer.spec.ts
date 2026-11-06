/**
 * Consumer Sass compile guard
 *
 * Consumers compile Grove's Sass with only the USWDS load path (per the README and
 * USWDS docs), but the repo's own builds also put src/sass on the load path, which
 * hides imports that only resolve here. These tests compile the way a consumer does.
 */

import { describe, expect, test } from "vitest";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import * as sass from "sass";
import { resolveUswdsRoot } from "./resolve-uswds-root";
import { listWebComponentNames } from "./web-components";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const webComponentsDir = path.join(projectRoot, "src/web-components");
const consumerLoadPaths = [path.join(resolveUswdsRoot(import.meta.url), "packages")];

function compileAsConsumer(file: string): string {
  return sass.compile(file, {
    loadPaths: consumerLoadPaths,
    quietDeps: true,
    logger: sass.Logger.silent,
  }).css;
}

describe("Sass compiled the way consumers compile it", () => {
  test("the global stylesheet compiles, includes web component classes, and has no shadow-only CSS", () => {
    const css = compileAsConsumer(path.join(projectRoot, "src/sass/styles.scss"));

    expect(css).toContain(".grove-divider");
    expect(css).not.toContain(":host");
  }, 30_000);

  test.each(listWebComponentNames(webComponentsDir))(
    "every stylesheet in %s compiles on its own",
    (name) => {
      const componentDir = path.join(webComponentsDir, name);
      const stylesheets = readdirSync(componentDir).filter((file) => file.endsWith(".scss"));

      for (const stylesheet of stylesheets) {
        expect(() => compileAsConsumer(path.join(componentDir, stylesheet))).not.toThrow();
      }
    },
  );
});

/**
 * Consumer Sass compile guard
 *
 * Consumers compile Grove's Sass with only the USWDS load path (per the README and
 * USWDS docs), but the repo's own builds also put src/sass on the load path, which
 * hides imports that only resolve here. These tests compile the way a consumer does.
 */

import { describe, expect, test } from "vitest";
import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveUswdsRoot } from "./resolve-uswds-root";
import { listWebComponentNames } from "./web-components";

const buildScriptsDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(buildScriptsDir, "..");
const webComponentsDir = path.join(projectRoot, "src/web-components");
const consumerLoadPath = path.join(resolveUswdsRoot(import.meta.url), "packages");

// Compiles in a child process; see compile-sass-as-consumer.mjs for why.
function compileAsConsumer(file: string): string {
  return execFileSync(
    process.execPath,
    [path.join(buildScriptsDir, "compile-sass-as-consumer.mjs"), file, consumerLoadPath],
    { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 },
  );
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

import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

// Matches the specifier in `import … from "x"`, `export … from "x"`, and `import "x"`.
// A regex is enough for this codebase's import styles; it doesn't need a parser.
const IMPORT_SPECIFIER = /(?:\bfrom|\bimport)\s*["']([^"']+)["']/g;

/**
 * Lists the package ("bare") imports reachable from entryFile: follows every
 * relative import transitively and returns the sorted, unique bare specifiers
 * found (e.g. ["lit", "lit/decorators.js"]). Stylesheet imports, such as
 * `./x.scss?inline`, aren't traversed; any other relative import that doesn't
 * resolve to a .ts file throws.
 */
export function listBareImports(entryFile: string): string[] {
  const bareImports = new Set<string>();
  const visited = new Set<string>();
  const pending = [entryFile];

  while (pending.length > 0) {
    const file = pending.pop()!;
    if (visited.has(file)) continue;
    visited.add(file);

    for (const [, specifier] of readFileSync(file, "utf8").matchAll(IMPORT_SPECIFIER)) {
      if (!specifier.startsWith(".")) {
        bareImports.add(specifier);
        continue;
      }
      const importPath = path.resolve(path.dirname(file), specifier.split("?")[0]);
      if (STYLESHEET_EXTENSIONS.includes(path.extname(importPath))) continue;

      const resolved = resolveTypeScriptFile(importPath);
      if (!resolved) {
        // Skipping would hide whatever that file imports, so the guard would pass blind
        throw new Error(`${file}: can't resolve "${specifier}" to a .ts file`);
      }
      pending.push(resolved);
    }
  }

  return [...bareImports].sort();
}

const STYLESHEET_EXTENSIONS = [".scss", ".css"];

// Resolves `./x` (or `./x.js`, as bundler module resolution allows) to `./x.ts`
// or `./x/index.ts`
function resolveTypeScriptFile(importPath: string): string | undefined {
  const candidates = [
    importPath,
    importPath + ".ts",
    importPath.replace(/\.js$/, ".ts"),
    path.join(importPath, "index.ts"),
  ];
  return candidates.find(
    (candidate) =>
      candidate.endsWith(".ts") && existsSync(candidate) && statSync(candidate).isFile(),
  );
}

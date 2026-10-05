import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { existsSync } from "node:fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Locate @uswds/uswds via Node's node_modules search order rather than a
// fixed relative depth, since npm workspaces hoists it to the repo-root
// node_modules. Uses resolve.paths (not require.resolve("@uswds/uswds/package.json"))
// because @uswds/uswds's "exports" map doesn't expose "./package.json" as a subpath.
const require = createRequire(import.meta.url);
const uswdsSearchPaths = require.resolve.paths("@uswds/uswds") ?? [];
const resolvedUswdsRoot = uswdsSearchPaths
  .map((searchPath) => path.join(searchPath, "@uswds/uswds"))
  .find((candidate) => existsSync(candidate));

if (!resolvedUswdsRoot) {
  throw new Error("Could not locate @uswds/uswds in any node_modules directory");
}

export const uswdsRoot = resolvedUswdsRoot;
export const uswdsPackagesDir = path.join(uswdsRoot, "packages");

export const scssLoadPaths = [path.resolve(__dirname, "../src/sass"), uswdsPackagesDir];

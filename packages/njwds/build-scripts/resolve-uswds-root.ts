import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

// Locate @uswds/uswds via Node's node_modules search order rather than a
// fixed relative depth, since npm workspaces hoists it to the repo-root
// node_modules. Uses resolve.paths (not require.resolve("@uswds/uswds/package.json"))
// because @uswds/uswds's "exports" map doesn't expose "./package.json" as a subpath.
export function resolveUswdsRoot(importMetaUrl: string): string {
  const require = createRequire(importMetaUrl);
  const uswdsSearchPaths = require.resolve.paths("@uswds/uswds") ?? [];
  const uswdsRoot = uswdsSearchPaths
    .map((searchPath) => path.join(searchPath, "@uswds/uswds"))
    .find((candidate) => existsSync(candidate));
  if (!uswdsRoot) {
    throw new Error("Could not locate @uswds/uswds in any node_modules directory");
  }
  return uswdsRoot;
}

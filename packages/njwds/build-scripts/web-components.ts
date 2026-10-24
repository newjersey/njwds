import { readdirSync } from "node:fs";

export function listWebComponentNames(webComponentsDir: string): string[] {
  return readdirSync(webComponentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

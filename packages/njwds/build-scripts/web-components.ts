import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

export function listWebComponentNames(webComponentsDir: string): string[] {
  return readdirSync(webComponentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export function getWebComponentClassName(webComponentsDir: string, name: string): string {
  const classFileContents = readFileSync(join(webComponentsDir, name, `${name}.ts`), "utf-8");
  const classNameMatch = classFileContents.match(/export class (\w+)/);
  if (!classNameMatch) {
    throw new Error(`[web-components] Could not find an exported class in ${name}/${name}.ts`);
  }
  return classNameMatch[1];
}

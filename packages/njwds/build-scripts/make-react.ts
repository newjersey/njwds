import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import prettier from "prettier";

interface ManifestEvent {
  name: string;
}

interface ManifestDeclaration {
  kind: string;
  name: string;
  tagName?: string;
  customElement?: boolean;
  events?: ManifestEvent[];
}

interface ManifestModule {
  path: string;
  declarations: ManifestDeclaration[];
}

interface Manifest {
  modules: ManifestModule[];
}

interface Component {
  name: string;
  tagName: string;
  path: string;
  events: ManifestEvent[];
}

function getAllComponents(manifest: Manifest): Component[] {
  const components: Component[] = [];
  for (const module of manifest.modules) {
    for (const declaration of module.declarations) {
      if (declaration.kind === "class" && declaration.customElement && declaration.tagName) {
        components.push({
          name: declaration.name,
          tagName: declaration.tagName,
          path: module.path,
          events: declaration.events ?? [],
        });
      }
    }
  }
  return components.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

function toPascalCase(dashCase: string): string {
  return dashCase
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join("");
}

const {
  values: { outdir },
} = parseArgs({ options: { outdir: { type: "string", default: "dist" } } });

const packageRoot = process.cwd();
const reactDir = path.join(packageRoot, "src", "react");

rmSync(reactDir, { recursive: true, force: true });
mkdirSync(reactDir, { recursive: true });

const manifest: Manifest = JSON.parse(
  readFileSync(path.join(packageRoot, outdir!, "custom-elements.json"), "utf8"),
);
const components = getAllComponents(manifest);
const prettierConfig = (await prettier.resolveConfig(packageRoot)) ?? {};

const exportLines: string[] = [];

for (const component of components) {
  const componentDir = path.join(reactDir, component.tagName);
  const componentFile = path.join(componentDir, "index.ts");
  const importPath = path.posix.relative(
    path.posix.join("src", "react", component.tagName),
    component.path.replace(/\.ts$/, ""),
  );
  const hasEvents = component.events.length > 0;

  const eventNameImport = hasEvents ? `import type { EventName } from "@lit/react";` : "";
  const eventsProperty = hasEvents
    ? `events: {
          ${component.events
            .map(
              (event) => `on${toPascalCase(event.name)}: "${event.name}" as EventName<CustomEvent>`,
            )
            .join(",\n")}
        },`
    : "";

  mkdirSync(componentDir, { recursive: true });

  const source = await prettier.format(
    `
      import * as React from "react";
      import { createComponent } from "@lit/react";
      import { ${component.name} as Component } from "${importPath}";
      ${eventNameImport}

      const tagName = "${component.tagName}";

      export const ${component.name} = createComponent({
        tagName,
        elementClass: Component,
        react: React,
        ${eventsProperty}
      });
    `,
    { ...prettierConfig, filepath: componentFile },
  );

  exportLines.push(`export { ${component.name} } from "./${component.tagName}";`);
  writeFileSync(componentFile, source, "utf8");
}

const indexSource = await prettier.format(exportLines.join("\n"), {
  ...prettierConfig,
  filepath: path.join(reactDir, "index.ts"),
});
writeFileSync(path.join(reactDir, "index.ts"), indexSource, "utf8");

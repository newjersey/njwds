import path from "node:path";

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

export interface Manifest {
  modules: ManifestModule[];
}

interface ReactComponent {
  name: string;
  tagName: string;
  modulePath: string;
  events: ManifestEvent[];
}

export function getCustomElements(manifest: Manifest): ReactComponent[] {
  const components: ReactComponent[] = [];
  for (const module of manifest.modules) {
    for (const declaration of module.declarations) {
      if (declaration.kind === "class" && declaration.customElement && declaration.tagName) {
        components.push({
          name: declaration.name,
          tagName: declaration.tagName,
          modulePath: module.path,
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

function getWrapperImportPath(component: ReactComponent): string {
  return path.posix.relative(
    path.posix.join("src", "react", component.tagName),
    path.posix.dirname(component.modulePath),
  );
}

export function renderWrapper(component: ReactComponent): string {
  const importPath = getWrapperImportPath(component);
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

  return `
    import * as React from "react";
    import { createComponent } from "@lit/react";
    import { ${component.name} as Component } from "${importPath}";
    ${eventNameImport}

    export const ${component.name} = createComponent({
      tagName: "${component.tagName}",
      elementClass: Component,
      react: React,
      ${eventsProperty}
    });
  `;
}

export function renderBarrel(components: ReactComponent[]): string {
  return components
    .map((component) => `export { ${component.name} } from "./${component.tagName}";`)
    .join("\n");
}

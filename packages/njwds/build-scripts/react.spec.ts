import { describe, test, expect } from "vitest";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getCustomElements, renderBarrel, renderWrapper, type Manifest } from "./react";
import { listWebComponentNames } from "./web-components";

// Ignores formatting (prettier output vs. raw template) and compares content only.
function withoutWhitespace(source: string): string {
  return source.replace(/\s+/g, "");
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const manifest: Manifest = {
  modules: [
    {
      path: "src/web-components/grove-divider/grove-divider.ts",
      declarations: [
        { kind: "class", name: "GroveDivider", customElement: true, tagName: "grove-divider" },
      ],
    },
    {
      path: "src/web-components/grove-accordion/grove-accordion.ts",
      declarations: [
        {
          kind: "class",
          name: "GroveAccordion",
          customElement: true,
          tagName: "grove-accordion",
          events: [{ name: "grove-toggle" }],
        },
      ],
    },
    {
      path: "src/web-components/grove-divider/grove-divider.ts",
      declarations: [{ kind: "function", name: "helper" }],
    },
  ],
};

describe("getCustomElements", () => {
  test("includes only custom element class declarations", () => {
    const components = getCustomElements(manifest);

    expect(components.map((component) => component.name)).toEqual([
      "GroveAccordion",
      "GroveDivider",
    ]);
  });

  test("sorts by tagName", () => {
    const components = getCustomElements(manifest);

    expect(components.map((component) => component.tagName)).toEqual([
      "grove-accordion",
      "grove-divider",
    ]);
  });
});

describe("renderWrapper", () => {
  test("imports from the component's directory, not its class module", () => {
    const [component] = getCustomElements(manifest).filter((c) => c.tagName === "grove-divider");

    const source = renderWrapper(component);

    expect(source).toContain('from "../../web-components/grove-divider"');
    expect(source).not.toContain("grove-divider.ts");
  });

  test("omits events and EventName when the component has none", () => {
    const [component] = getCustomElements(manifest).filter((c) => c.tagName === "grove-divider");

    const source = renderWrapper(component);

    expect(source).not.toContain("events:");
    expect(source).not.toContain("EventName");
  });

  test("includes a typed events map when the component dispatches events", () => {
    const [component] = getCustomElements(manifest).filter((c) => c.tagName === "grove-accordion");

    const source = renderWrapper(component);

    expect(source).toContain('import type { EventName } from "@lit/react";');
    expect(source).toContain('onGroveToggle: "grove-toggle" as EventName<CustomEvent>');
  });
});

describe("generated react wrappers stay in sync with web components", () => {
  const projectRoot = path.resolve(__dirname, "..");
  const distRoot = path.join(projectRoot, "dist");
  const reactDir = path.join(projectRoot, "src", "react");
  const manifestPath = path.join(distRoot, "custom-elements.json");
  const regenerateHint = "run `npm run react:build` to regenerate src/react";

  test("every committed wrapper matches what the generator produces from the current manifest", () => {
    expect(existsSync(manifestPath), `missing dist/custom-elements.json — ${regenerateHint}`).toBe(
      true,
    );

    const manifest: Manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
    const components = getCustomElements(manifest);

    for (const component of components) {
      const componentFile = path.join(reactDir, component.tagName, "index.ts");
      expect(
        existsSync(componentFile),
        `missing src/react/${component.tagName} — ${regenerateHint}`,
      ).toBe(true);

      expect(
        withoutWhitespace(readFileSync(componentFile, "utf8")),
        `src/react/${component.tagName}/index.ts is stale — ${regenerateHint}`,
      ).toEqual(withoutWhitespace(renderWrapper(component)));
    }

    const indexFile = path.join(reactDir, "index.ts");
    expect(
      withoutWhitespace(readFileSync(indexFile, "utf8")),
      `src/react/index.ts is stale — ${regenerateHint}`,
    ).toEqual(withoutWhitespace(renderBarrel(components)));

    // Catches wrappers left behind for components that no longer exist in the manifest.
    const reactNames = listWebComponentNames(reactDir);
    expect(reactNames.sort(), `src/react has orphaned wrappers — ${regenerateHint}`).toEqual(
      components.map((component) => component.tagName).sort(),
    );
  });
});

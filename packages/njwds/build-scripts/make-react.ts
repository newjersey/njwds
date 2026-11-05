import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import prettier from "prettier";
import { getCustomElements, renderBarrel, renderWrapper, type Manifest } from "./react.ts";

const projectRoot = process.cwd();
const distRoot = path.join(projectRoot, "dist");
const reactDir = path.join(projectRoot, "src", "react");

rmSync(reactDir, { recursive: true, force: true });
mkdirSync(reactDir, { recursive: true });

const manifest: Manifest = JSON.parse(
  readFileSync(path.join(distRoot, "custom-elements.json"), "utf8"),
);
const components = getCustomElements(manifest);
const prettierConfig = (await prettier.resolveConfig(projectRoot)) ?? {};

for (const component of components) {
  const componentDir = path.join(reactDir, component.tagName);
  const componentFile = path.join(componentDir, "index.ts");

  mkdirSync(componentDir, { recursive: true });

  const source = await prettier.format(renderWrapper(component), {
    ...prettierConfig,
    filepath: componentFile,
  });
  writeFileSync(componentFile, source, "utf8");
}

const indexFile = path.join(reactDir, "index.ts");
const indexSource = await prettier.format(renderBarrel(components), {
  ...prettierConfig,
  filepath: indexFile,
});
writeFileSync(indexFile, indexSource, "utf8");

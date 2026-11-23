/**
 * Scaffolds a new Grove web component: the element, its React wrapper, stories and
 * Playwright specs, from the templates in ./templates/. The build, the /react entry
 * and the CDN bundle discover the component on their own, so nothing else changes.
 *
 * Usage (from the repo root): npm run new-component -- <name> [--title "<Title>"] [--css-class]
 *
 * See "Scaffolding script specification" in
 * documents/architecture/adding-a-web-component.md for what each check protects.
 */

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sanitize } from "storybook/internal/csf";

export const WEB_COMPONENT_IMPORTS_ANCHOR = "// web component imports";

export const TEMPLATES_DIR = path.join(import.meta.dirname, "templates");

// npm runs workspace scripts from packages/njwds, but resolve from this file so any cwd works
const PACKAGE_DIR = path.join(import.meta.dirname, "..");
const REPO_ROOT = path.join(PACKAGE_DIR, "..", "..");
const WEB_COMPONENTS_DIR = path.join(PACKAGE_DIR, "src/web-components");
const CUSTOM_STYLES_PATH = path.join(PACKAGE_DIR, "src/sass/_uswds-theme-custom-styles.scss");

const NAME_PATTERN = /^[a-z][a-z0-9]*(-[a-z0-9]+)*$/;

// `shared` is the helpers folder; the rest are --grove-<name>-* namespaces owned by @newjersey/tokens
const RESERVED_NAMES = ["shared", "breakpoint", "color", "font", "line", "measure"];

export interface ParsedArgs {
  name?: string;
  title?: string;
  cssClass: boolean;
  errors: string[];
}

export function parseArgs(argv: string[]): ParsedArgs {
  const parsed: ParsedArgs = { name: undefined, title: undefined, cssClass: false, errors: [] };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--css-class") {
      parsed.cssClass = true;
    } else if (arg === "--title") {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) {
        parsed.errors.push('--title needs a value, e.g. --title "FAQ list"');
      } else {
        parsed.title = value;
        i++;
      }
    } else if (arg.startsWith("--")) {
      parsed.errors.push(`Unknown option ${arg}. Options are --title "<Title>" and --css-class`);
    } else if (parsed.name === undefined) {
      parsed.name = arg;
    } else {
      parsed.errors.push(`Unexpected argument ${arg}. Pass one component name`);
    }
  }

  if (parsed.name === undefined) {
    parsed.errors.push("Missing component name, e.g. npm run new-component -- date-picker");
  }

  return parsed;
}

/** `date-picker` → `DatePicker` */
export function pascalName(name: string): string {
  return name
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/** `date-picker` → `Date picker` (sentence case, as Storybook titles in this repo use) */
export function defaultTitle(name: string): string {
  const words = name.split("-").join(" ");
  return words.charAt(0).toUpperCase() + words.slice(1);
}

function forwardLine(name: string): string {
  return `@forward "../web-components/grove-${name}/grove-${name}";`;
}

/**
 * Returns every reason the scaffold can't be written; empty means go ahead.
 * `customStyles` is the contents of src/sass/_uswds-theme-custom-styles.scss.
 */
export function validate(
  args: ParsedArgs,
  { webComponentsDir, customStyles }: { webComponentsDir: string; customStyles: string },
): string[] {
  const { name, title, cssClass } = args;
  if (name === undefined) return [...args.errors];

  const errors = [...args.errors];

  if (name.startsWith("grove-")) {
    errors.push(`Pass the name without the "grove-" prefix: ${name.slice("grove-".length)}`);
  } else if (!NAME_PATTERN.test(name)) {
    errors.push(`"${name}" must be kebab-case: lowercase letters and digits, e.g. date-picker`);
  } else if (RESERVED_NAMES.includes(name)) {
    errors.push(`"${name}" is reserved (${RESERVED_NAMES.join(", ")})`);
  }

  const componentDir = path.join(webComponentsDir, `grove-${name}`);
  if (existsSync(componentDir)) {
    errors.push(`${componentDir} already exists`);
  }

  // Playwright URLs are built from <name>, so the title must produce the same story id.
  // sanitize() turns "/" into "-", so a nested title would pass that check; reject it first.
  if (title?.includes("/")) {
    errors.push(`--title "${title}" can't contain "/", which would nest the story in Storybook`);
  } else if (title !== undefined && sanitize(title) !== name) {
    errors.push(
      `--title "${title}" gives the story id "${sanitize(title)}", not "${name}". ` +
        `Change only capitalisation, e.g. --title "FAQ list" for faq-list`,
    );
  }

  if (cssClass) {
    if (!customStyles.split("\n").includes(WEB_COMPONENT_IMPORTS_ANCHOR)) {
      errors.push(
        `The global stylesheet has no "${WEB_COMPONENT_IMPORTS_ANCHOR}" line to add the @forward under`,
      );
    } else if (customStyles.includes(forwardLine(name))) {
      errors.push(`The global stylesheet already forwards grove-${name}`);
    }
  }

  return errors;
}

/**
 * Adds the component's @forward to the block of web component forwards under the
 * anchor comment, keeping the block sorted.
 */
export function insertForward(customStyles: string, name: string): string {
  const lines = customStyles.split("\n");
  const anchor = lines.indexOf(WEB_COMPONENT_IMPORTS_ANCHOR);
  if (anchor === -1) {
    throw new Error(`No "${WEB_COMPONENT_IMPORTS_ANCHOR}" line in the global stylesheet`);
  }

  let end = anchor + 1;
  while (end < lines.length && lines[end].startsWith('@forward "../web-components/')) end++;

  const block = [...lines.slice(anchor + 1, end), forwardLine(name)].sort();
  lines.splice(anchor + 1, end - anchor - 1, ...block);
  return lines.join("\n");
}

/** One generated file: where it goes (relative to packages/njwds/) and which template fills it */
export interface PlannedFile {
  path: string;
  template: string;
}

export function planFiles(name: string, cssClass: boolean): PlannedFile[] {
  const Name = pascalName(name);
  const component = `src/web-components/grove-${name}`;
  const tests = `src/tests/components/${name}`;

  const files = [
    { path: `${component}/grove-${name}.ts`, template: "element.ts.tpl" },
    { path: `${component}/grove-${name}.scss`, template: "element.scss.tpl" },
    { path: `${component}/index.ts`, template: "index.ts.tpl" },
    { path: `${component}/grove-${name}.react.ts`, template: "react.ts.tpl" },
    { path: `${component}/grove-${name}.spec.ts`, template: "element.spec.ts.tpl" },
    { path: `${component}/grove-${name}.react.spec.ts`, template: "react.spec.ts.tpl" },
    {
      path: `src/stories/web-components/${Name}/${Name}.stories.ts`,
      template: "web-component.stories.ts.tpl",
    },
    {
      path: `src/stories/react-components/${Name}/${Name}.stories.ts`,
      template: "react.stories.ts.tpl",
    },
    { path: `${tests}/visual/grove-${name}.visual.spec.ts`, template: "visual.spec.ts.tpl" },
    {
      path: `${tests}/accessibility/grove-${name}.accessibility.spec.ts`,
      template: "accessibility.spec.ts.tpl",
    },
  ];

  if (cssClass) {
    files.push({
      path: `src/stories/components/${Name}/${Name}.stories.ts`,
      template: "css-only.stories.ts.tpl",
    });
  }

  return files;
}

/** The values for the templates' {{placeholders}} */
export function templateValues({
  name,
  title,
  cssClass,
}: {
  name: string;
  title?: string;
  cssClass: boolean;
}): Record<string, string> {
  // The CSS-only story's Playwright case, listed first in both suites
  const cssOnlyCase = cssClass
    ? `  {\n    name: "Default",\n    url: \`/iframe.html?id=components-${name}--default&viewMode=story\`,\n  },\n`
    : "";

  return { name, Name: pascalName(name), Title: title ?? defaultTitle(name), cssOnlyCase };
}

/** Replaces every {{key}} in the template; an unknown key is a template bug, so it throws */
export function fillTemplate(template: string, values: Record<string, string>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (placeholder, key: string) => {
    if (!(key in values)) throw new Error(`Template has no value for ${placeholder}`);
    return values[key];
  });
}

function main(argv: string[]) {
  const args = parseArgs(argv);
  const customStyles = readFileSync(CUSTOM_STYLES_PATH, "utf8");
  const errors = validate(args, { webComponentsDir: WEB_COMPONENTS_DIR, customStyles });
  if (errors.length > 0) {
    console.error(
      `Can't scaffold the component:\n${errors.map((error) => `  - ${error}`).join("\n")}`,
    );
    process.exitCode = 1;
    return;
  }

  const name = args.name!;
  const values = templateValues({ name, title: args.title, cssClass: args.cssClass });
  const written: string[] = [];

  for (const file of planFiles(name, args.cssClass)) {
    const target = path.join(PACKAGE_DIR, file.path);
    const template = readFileSync(path.join(TEMPLATES_DIR, file.template), "utf8");
    mkdirSync(path.dirname(target), { recursive: true });
    // "wx" refuses to overwrite, e.g. a grove-<name> Playwright spec that's already there
    writeFileSync(target, fillTemplate(template, values), { flag: "wx" });
    written.push(target);
  }

  if (args.cssClass) {
    writeFileSync(CUSTOM_STYLES_PATH, insertForward(customStyles, name));
    written.push(CUSTOM_STYLES_PATH);
  }

  const relativePaths = written.map((file) => path.relative(REPO_ROOT, file));
  console.log(`Created grove-${name}:\n${relativePaths.map((file) => `  ${file}`).join("\n")}\n`);

  // Some template lines exceed printWidth, and CI runs format:check
  const prettier = spawnSync(
    "npx",
    ["prettier", "--write", "--log-level", "warn", ...relativePaths],
    {
      cwd: REPO_ROOT,
      stdio: "inherit",
    },
  );
  if (prettier.status !== 0) {
    console.error("Prettier failed. The files are correct but unformatted: run npm run format.");
    process.exitCode = 1;
  }

  console.log(`Next steps:
  1. Build the element in src/web-components/grove-${name}/grove-${name}.ts. Its markup is a
     placeholder: if you change <div class="grove-${name}">, update the selector in both unit
     specs${args.cssClass ? " and the CSS-only story" : ""} to match.
  2. npm run test: the generated specs pass, including the React wrapper smoke test.
  3. npm run grove:build, then from packages/njwds confirm the npm, React and CDN outputs:
       ls dist/web-components/grove-${name}/
       grep "grove-${name}" index.js dist/react/index.d.ts
       grep -c "grove-${name}" dist/web-components/grove.min.js
  4. With Storybook running (npm run storybook), npm run test:visual:update creates the
     screenshot baselines.
  5. If the component is interactive, add Playwright keyboard tests.
  6. Before the PR, run the checks in step 7 of documents/architecture/adding-a-web-component.md.`);
}

if (import.meta.main) main(process.argv.slice(2));

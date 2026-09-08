import { beforeAll, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import StyleDictionary from "style-dictionary";
import config, { prefix } from "../config/style-dictionary.config.js";
import { outputs } from "../config/outputs.js";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));

function readBuildFile(relativePath: string) {
  return readFileSync(path.join(packageRoot, "build", relativePath), "utf8");
}

beforeAll(async () => {
  const styleDictionary = new StyleDictionary(config);
  await styleDictionary.buildAllPlatforms();
});

describe("CSS output", () => {
  it(`prefixes every custom property with --${prefix}-`, () => {
    const css = readBuildFile("css/tokens.css");
    const names = [...css.matchAll(/--([a-z0-9-]+):/g)].map((match) => match[1]);

    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.startsWith(`${prefix}-`)).toBe(true);
    }
  });

  it("includes known primitive tokens with expected values", () => {
    const css = readBuildFile("css/tokens.css");

    expect(css).toContain(`--${prefix}-font-size-6: 1.0625rem;`);
    expect(css).toContain(`--${prefix}-line-height-3: 1.35;`);
    expect(css).toContain(`--${prefix}-color-black: #000000;`);
  });

  it("resolves semantic aliases to their referenced primitive", () => {
    const css = readBuildFile("css/tokens.css");

    expect(css).toContain(`--${prefix}-font-size-md: var(--${prefix}-font-size-6);`);
  });
});

describe("Sass output", () => {
  it(`prefixes every variable with $${prefix}-`, () => {
    const scss = readBuildFile("scss/_tokens.scss");
    const names = [...scss.matchAll(/\$([a-z0-9-]+):/g)].map((match) => match[1]);

    expect(names.length).toBeGreaterThan(0);
    for (const name of names) {
      expect(name.startsWith(`${prefix}-`)).toBe(true);
    }
  });
});

describe("JSON output", () => {
  it("does not prefix token names", () => {
    const tokens = JSON.parse(readBuildFile("json/tokens.json"));

    const topLevelKeys = Object.keys(tokens);
    expect(topLevelKeys.length).toBeGreaterThan(0);
    for (const key of topLevelKeys) {
      expect(key.startsWith(`${prefix}-`)).toBe(false);
    }
  });

  it("includes known tokens with expected values", () => {
    const tokens = JSON.parse(readBuildFile("json/tokens.json"));

    expect(tokens["font-size"].md).toBe("1.0625rem");
    expect(tokens["line-height"]["3"]).toBe(1.35);
    expect(tokens.color.black).toBe("#000000");
  });
});

describe("per-category outputs", () => {
  it.each(outputs.map(({ name }) => name))("generates %s files for every platform", (category) => {
    expect(() => readBuildFile(`css/${category}.css`)).not.toThrow();
    expect(() => readBuildFile(`scss/_${category}.scss`)).not.toThrow();
    expect(() => readBuildFile(`json/${category}.json`)).not.toThrow();
  });
});

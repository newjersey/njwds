/**
 * Tests for the new-component scaffolding script's pure helpers
 *
 * The script's job is to hand every contributor the same starting point, so these
 * pin down the parts a successful run can't prove: how names and titles are
 * derived, that every validation check rejects bad input before anything is
 * written, and where the global @forward lands.
 */

import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import {
  defaultTitle,
  fillTemplate,
  insertForward,
  parseArgs,
  pascalName,
  planFiles,
  TEMPLATES_DIR,
  templateValues,
  validate,
  WEB_COMPONENT_IMPORTS_ANCHOR,
} from "./new-component.ts";

const CUSTOM_STYLES = `@forward "theme/nj-table";

${WEB_COMPONENT_IMPORTS_ANCHOR}
@forward "../web-components/grove-divider/grove-divider";

// Needs official integration
`;

let webComponentsDir: string;

beforeEach(() => {
  webComponentsDir = mkdtempSync(path.join(tmpdir(), "grove-new-component-"));
});

afterEach(() => {
  rmSync(webComponentsDir, { recursive: true, force: true });
});

function errorsFor(argv: string[], customStyles = CUSTOM_STYLES) {
  return validate(parseArgs(argv), { webComponentsDir, customStyles });
}

describe("name derivation", () => {
  test("pascalName capitalises each kebab-case part", () => {
    expect(pascalName("date-picker")).toBe("DatePicker");
    expect(pascalName("faq-list")).toBe("FaqList");
  });

  test("defaultTitle is sentence case", () => {
    expect(defaultTitle("date-picker")).toBe("Date picker");
    expect(defaultTitle("divider")).toBe("Divider");
  });
});

describe("parseArgs", () => {
  test("reads the name, --title and --css-class", () => {
    expect(parseArgs(["faq-list", "--title", "FAQ list", "--css-class"])).toEqual({
      name: "faq-list",
      title: "FAQ list",
      cssClass: true,
      errors: [],
    });
  });

  test("defaults to no title override and no CSS-only version", () => {
    expect(parseArgs(["date-picker"])).toEqual({
      name: "date-picker",
      title: undefined,
      cssClass: false,
      errors: [],
    });
  });

  test("reports a missing name", () => {
    expect(parseArgs([]).errors).toEqual([expect.stringContaining("Missing component name")]);
  });

  test("reports --title without a value", () => {
    expect(parseArgs(["faq-list", "--title"]).errors).toEqual([
      expect.stringContaining("--title needs a value"),
    ]);
    expect(parseArgs(["faq-list", "--title", "--css-class"]).errors).toEqual([
      expect.stringContaining("--title needs a value"),
    ]);
  });

  test("reports unknown options and extra names", () => {
    expect(parseArgs(["faq-list", "--events"]).errors).toEqual([
      expect.stringContaining("Unknown option --events"),
    ]);
    expect(parseArgs(["faq-list", "date-picker"]).errors).toEqual([
      expect.stringContaining("Unexpected argument date-picker"),
    ]);
  });
});

describe("validate", () => {
  test("accepts a new, valid name", () => {
    expect(errorsFor(["date-picker"])).toEqual([]);
    expect(errorsFor(["date-picker", "--css-class"])).toEqual([]);
  });

  test("passes on argument errors", () => {
    expect(errorsFor([])).toEqual([expect.stringContaining("Missing component name")]);
  });

  test("rejects a grove- prefix and says to drop it", () => {
    expect(errorsFor(["grove-date-picker"])).toEqual([
      expect.stringContaining('without the "grove-" prefix'),
    ]);
  });

  test.each(["Date-picker", "date_picker", "date--picker", "1-picker", "date-"])(
    "rejects %s as not kebab-case",
    (name) => {
      expect(errorsFor([name])).toEqual([expect.stringContaining("kebab-case")]);
    },
  );

  test.each(["shared", "breakpoint", "color", "font", "line", "measure"])(
    "rejects the reserved name %s",
    (name) => {
      expect(errorsFor([name])).toEqual([expect.stringContaining("reserved")]);
    },
  );

  test("rejects a component that already exists", () => {
    mkdirSync(path.join(webComponentsDir, "grove-date-picker"));
    expect(errorsFor(["date-picker"])).toEqual([expect.stringContaining("already exists")]);
  });

  test("accepts a --title that produces the name's story id", () => {
    expect(errorsFor(["faq-list", "--title", "FAQ list"])).toEqual([]);
  });

  test("rejects a --title that doesn't produce the name's story id", () => {
    expect(errorsFor(["faq-list", "--title", "Frequently asked questions"])).toEqual([
      expect.stringContaining("frequently-asked-questions"),
    ]);
  });

  // sanitize() turns "/" into "-", so the id matches, but Storybook would nest the story
  test("rejects a --title containing /", () => {
    expect(errorsFor(["faq-list", "--title", "FAQ/list"])).toEqual([
      expect.stringContaining('can\'t contain "/"'),
    ]);
  });

  test("with --css-class, rejects a stylesheet missing the anchor comment", () => {
    expect(errorsFor(["date-picker", "--css-class"], '@forward "theme/nj-table";\n')).toEqual([
      expect.stringContaining(WEB_COMPONENT_IMPORTS_ANCHOR),
    ]);
  });

  test("with --css-class, rejects a @forward that's already there", () => {
    expect(
      errorsFor(["divider-new", "--css-class"], insertForward(CUSTOM_STYLES, "divider-new")),
    ).toEqual([expect.stringContaining("already forwards")]);
  });

  test("without --css-class, ignores the stylesheet", () => {
    expect(errorsFor(["date-picker"], "")).toEqual([]);
  });

  test("reports every failure at once", () => {
    mkdirSync(path.join(webComponentsDir, "grove-Bad"));
    expect(errorsFor(["Bad", "--title", "Something else", "--css-class"], "")).toHaveLength(4);
  });
});

describe("insertForward", () => {
  const forward = (name: string) => `@forward "../web-components/grove-${name}/grove-${name}";`;

  test("adds the component's @forward to the block, keeping it sorted", () => {
    const twoLines = CUSTOM_STYLES.replace(
      forward("divider"),
      `${forward("alpha")}\n${forward("zeta")}`,
    );
    expect(insertForward(twoLines, "middle")).toBe(
      twoLines.replace(forward("zeta"), `${forward("middle")}\n${forward("zeta")}`),
    );
  });

  test("appends at the end of the block, before the blank line", () => {
    expect(insertForward(CUSTOM_STYLES, "faq-list")).toBe(
      CUSTOM_STYLES.replace(forward("divider"), `${forward("divider")}\n${forward("faq-list")}`),
    );
  });

  test("throws when the anchor comment is missing", () => {
    expect(() => insertForward('@forward "theme/nj-table";\n', "faq-list")).toThrow(
      WEB_COMPONENT_IMPORTS_ANCHOR,
    );
  });
});

describe("templates", () => {
  const COMMON_FILES = [
    "src/web-components/grove-date-picker/grove-date-picker.ts",
    "src/web-components/grove-date-picker/grove-date-picker.scss",
    "src/web-components/grove-date-picker/index.ts",
    "src/web-components/grove-date-picker/grove-date-picker.react.ts",
    "src/web-components/grove-date-picker/grove-date-picker.spec.ts",
    "src/web-components/grove-date-picker/grove-date-picker.react.spec.ts",
    "src/stories/web-components/DatePicker/DatePicker.stories.ts",
    "src/stories/react-components/DatePicker/DatePicker.stories.ts",
    "src/tests/components/date-picker/visual/grove-date-picker.visual.spec.ts",
    "src/tests/components/date-picker/accessibility/grove-date-picker.accessibility.spec.ts",
  ];

  test("planFiles writes the component, stories and Playwright specs", () => {
    expect(planFiles("date-picker", false).map((file) => file.path)).toEqual(COMMON_FILES);
  });

  test("planFiles adds the CSS-only story with --css-class", () => {
    expect(planFiles("date-picker", true).map((file) => file.path)).toEqual([
      ...COMMON_FILES,
      "src/stories/components/DatePicker/DatePicker.stories.ts",
    ]);
  });

  test("every template in the templates folder is used", () => {
    const used = planFiles("date-picker", true).map((file) => file.template);
    expect(used.sort()).toEqual(readdirSync(TEMPLATES_DIR).sort());
  });

  test("fillTemplate replaces every placeholder", () => {
    expect(
      fillTemplate("{{Name}} is <grove-{{name}}> ({{name}})", {
        name: "faq-list",
        Name: "FaqList",
      }),
    ).toBe("FaqList is <grove-faq-list> (faq-list)");
  });

  test("fillTemplate throws on a placeholder it has no value for", () => {
    expect(() => fillTemplate("{{nmae}}", { name: "faq-list" })).toThrow("{{nmae}}");
  });

  test("templateValues uses the --title override and adds the CSS-only case only when asked", () => {
    const values = templateValues({ name: "faq-list", title: "FAQ list", cssClass: false });
    expect(values).toMatchObject({
      name: "faq-list",
      Name: "FaqList",
      Title: "FAQ list",
      cssOnlyCase: "",
    });
    expect(templateValues({ name: "faq-list", cssClass: true }).cssOnlyCase).toContain(
      "id=components-faq-list--default",
    );
  });

  test.each([false, true])("every template fills completely (cssClass: %s)", (cssClass) => {
    const values = templateValues({ name: "faq-list", cssClass });
    for (const file of planFiles("faq-list", cssClass)) {
      const filled = fillTemplate(
        readFileSync(path.join(TEMPLATES_DIR, file.template), "utf8"),
        values,
      );
      expect(filled, file.template).not.toContain("{{");
    }
  });
});

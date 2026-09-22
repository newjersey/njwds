import { describe, test, expect } from "vitest";
import { render } from "lit";
import { renderRequired } from "../../utils/requiredIndicator";

function renderToContainer(required: boolean): HTMLDivElement {
  const container = document.createElement("div");
  render(renderRequired(required), container);
  return container;
}

describe("renderRequired", () => {
  test("renders a required indicator when required is true", () => {
    const container = renderToContainer(true);
    const abbr = container.querySelector("abbr");

    expect(abbr).not.toBeNull();
    expect(abbr?.textContent).toBe("*");
  });

  test("uses a title attribute so the asterisk is announced as 'required'", () => {
    const container = renderToContainer(true);
    const abbr = container.querySelector("abbr");

    expect(abbr?.getAttribute("title")).toBe("required");
  });

  test("applies the usa-label--required class", () => {
    const container = renderToContainer(true);

    expect(container.querySelector("abbr.usa-label--required")).not.toBeNull();
  });

  test("renders nothing when required is false", () => {
    const container = renderToContainer(false);

    expect(container.querySelector("abbr")).toBeNull();
    expect(container.textContent).toBe("");
  });
});

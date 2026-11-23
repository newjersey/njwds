/**
 * Render smoke test for the grove-{{name}} React wrapper
 *
 * A wrapper with the wrong tagName still type-checks, but renders an unregistered,
 * empty element. Rendering through react-dom proves the wrapper produces the real,
 * upgraded <grove-{{name}}> with its shadow DOM.
 */
import { afterEach, describe, expect, test } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { Grove{{Name}} } from "./grove-{{name}}.react.js";
import type { Grove{{Name}} as Grove{{Name}}Element } from "./grove-{{name}}.js";

// Tells React this environment supports act(), so it doesn't warn on every update
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("Grove{{Name}} (React wrapper)", () => {
  let container: HTMLElement;
  let root: Root;

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  test("renders a registered <grove-{{name}}> with its shadow DOM", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => root.render(createElement(Grove{{Name}})));

    const element = container.querySelector("grove-{{name}}");
    expect(customElements.get("grove-{{name}}")).toBeDefined();
    expect(element).toBeInstanceOf(customElements.get("grove-{{name}}")!);
    await (element as Grove{{Name}}Element).updateComplete;
    expect(element!.shadowRoot!.querySelector("div.grove-{{name}}")).not.toBeNull();
  });
});

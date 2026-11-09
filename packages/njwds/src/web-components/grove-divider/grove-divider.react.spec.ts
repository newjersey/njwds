/**
 * Render smoke test for the grove-divider React wrapper
 *
 * A wrapper with the wrong tagName still type-checks, but renders an unregistered,
 * empty element. Rendering through react-dom proves the wrapper produces the real,
 * upgraded <grove-divider> with its shadow DOM.
 */
import { afterEach, describe, expect, test } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { GroveDivider } from "./grove-divider.react.js";
import type { GroveDivider as GroveDividerElement } from "./grove-divider.js";

// Tells React this environment supports act(), so it doesn't warn on every update
(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

describe("GroveDivider (React wrapper)", () => {
  let container: HTMLElement;
  let root: Root;

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  test("renders a registered <grove-divider> with its shadow <hr>", async () => {
    container = document.createElement("div");
    document.body.appendChild(container);
    root = createRoot(container);

    act(() => root.render(createElement(GroveDivider)));

    const element = container.querySelector("grove-divider");
    expect(customElements.get("grove-divider")).toBeDefined();
    expect(element).toBeInstanceOf(customElements.get("grove-divider")!);
    await (element as GroveDividerElement).updateComplete;
    expect(element!.shadowRoot!.querySelector("hr.grove-divider")).not.toBeNull();
  });
});

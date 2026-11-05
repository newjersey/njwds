import { describe, test, expect, afterEach } from "vitest";
import { act, createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { GroveDivider } from "../../react/grove-divider";
import { GroveDivider as GroveDividerElement } from "../../web-components/grove-divider/grove-divider";

let container: HTMLDivElement | undefined;
let root: Root | undefined;

afterEach(async () => {
  if (root) {
    await act(async () => root!.unmount());
    root = undefined;
  }
  container?.remove();
  container = undefined;
});

async function renderToContainer(
  element: ReturnType<typeof createElement>,
): Promise<HTMLDivElement> {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root!.render(element));
  return container;
}

describe("React wrappers", () => {
  test("GroveDivider renders a registered grove-divider custom element", async () => {
    const container = await renderToContainer(createElement(GroveDivider));

    expect(container.querySelector("grove-divider")).toBeInstanceOf(GroveDividerElement);
  });
});

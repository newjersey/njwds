import { describe, test, expect, afterEach } from "vitest";
import { act } from "react";
import { createElement } from "react";
import { createRoot, type Root } from "react-dom/client";
import { within } from "@testing-library/dom";
import { NjDivider } from "../../react/nj-divider";
import { NjIdentifier } from "../../react/nj-identifier";
import { NjDivider as NjDividerElement } from "../../web-components/nj-divider/nj-divider";
import { NjIdentifier as NjIdentifierElement } from "../../web-components/nj-identifier/nj-identifier";

declare global {
  var IS_REACT_ACT_ENVIRONMENT: boolean;
}

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

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

async function mount(element: ReturnType<typeof createElement>) {
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  await act(async () => root!.render(element));
  return container;
}

function withinShadowRoot(shadowRoot: ShadowRoot) {
  return within(shadowRoot as unknown as HTMLElement);
}

describe("React wrappers", () => {
  test("NjDivider renders the underlying nj-divider custom element", async () => {
    const rendered = await mount(createElement(NjDivider));

    expect(rendered.querySelector("nj-divider")).toBeInstanceOf(NjDividerElement);
  });

  test("NjIdentifier renders the underlying nj-identifier custom element", async () => {
    const rendered = await mount(createElement(NjIdentifier));

    expect(rendered.querySelector("nj-identifier")).toBeInstanceOf(NjIdentifierElement);
  });

  test("NjIdentifier forwards object and array props into the element's render output", async () => {
    const additionalLogos = [{ src: "/partner-logo.png", alt: "Partner" }];
    const content = { masthead: { ariaLabel: "Custom agency identifier" } };

    const rendered = await mount(createElement(NjIdentifier, { additionalLogos, content }));
    const el = rendered.querySelector("nj-identifier") as NjIdentifierElement;
    await el.updateComplete;

    const shadowRoot = withinShadowRoot(el.shadowRoot!);
    expect(shadowRoot.getByRole("region", { name: content.masthead.ariaLabel })).toBeTruthy();
    expect(shadowRoot.getByRole("img", { name: "Partner" })).toBeTruthy();
  });

  test("NjIdentifier forwards the hideLogo boolean prop into the element's render output", async () => {
    const rendered = await mount(createElement(NjIdentifier, { hideLogo: true }));
    const el = rendered.querySelector("nj-identifier") as NjIdentifierElement;
    await el.updateComplete;

    expect(withinShadowRoot(el.shadowRoot!).queryByRole("img")).toBeNull();
  });
});

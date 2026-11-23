import { afterEach, describe, expect, test } from "vitest";
import "./index.js";

afterEach(() => {
  document.body.innerHTML = "";
});

describe("<grove-{{name}}>", () => {
  test("renders its shadow DOM", async () => {
    const el = document.createElement("grove-{{name}}");
    document.body.append(el);
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector("div.grove-{{name}}")).not.toBeNull();
  });
});

/**
 * Tests for defineElement
 *
 * Two copies of Grove can end up on one page (the CDN bundle plus an npm-bundled
 * copy, or two CDN versions). customElements.define throws on a second registration
 * of a tag, which would break whatever loaded the second copy, so defineElement
 * must register once and never throw. Each test uses its own tag because the
 * registry can't be reset between tests.
 */
import { afterEach, describe, expect, test, vi } from "vitest";
import { defineElement } from "./define-element.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("defineElement", () => {
  test("registers the tag when it isn't registered yet", () => {
    class FreeElement extends HTMLElement {}

    defineElement("test-define-free", FreeElement);

    expect(customElements.get("test-define-free")).toBe(FreeElement);
  });

  test("does nothing, and doesn't warn, when the same class is already registered", () => {
    class SameElement extends HTMLElement {}
    // eslint-disable-next-line wc/guard-define-call -- deliberately pre-registers the tag under test
    customElements.define("test-define-same", SameElement);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(() => defineElement("test-define-same", SameElement)).not.toThrow();

    expect(customElements.get("test-define-same")).toBe(SameElement);
    expect(warn).not.toHaveBeenCalled();
  });

  test("warns naming the tag, instead of throwing, when a different class holds it", () => {
    class FirstElement extends HTMLElement {}
    class OtherVersionElement extends HTMLElement {}
    // eslint-disable-next-line wc/guard-define-call -- deliberately pre-registers the tag under test
    customElements.define("test-define-conflict", FirstElement);
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    expect(() => defineElement("test-define-conflict", OtherVersionElement)).not.toThrow();

    expect(customElements.get("test-define-conflict")).toBe(FirstElement);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toContain("<test-define-conflict>");
  });
});

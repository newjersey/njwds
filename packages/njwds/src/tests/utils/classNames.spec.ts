import { describe, test, expect } from "vitest";
import { classNames } from "../../utils/classNames";

describe("classNames", () => {
  test("joins multiple class names with a space", () => {
    expect(classNames("usa-button", "usa-button--secondary")).toBe(
      "usa-button usa-button--secondary",
    );
  });

  test("filters out false values", () => {
    expect(classNames("usa-button", false, "usa-button--big")).toBe("usa-button usa-button--big");
  });

  test("filters out null and undefined values", () => {
    expect(classNames("usa-button", null, undefined, "usa-button--big")).toBe(
      "usa-button usa-button--big",
    );
  });

  test("filters out empty strings", () => {
    expect(classNames("usa-button", "", "usa-button--big")).toBe("usa-button usa-button--big");
  });

  test("returns an empty string when every argument is falsy", () => {
    expect(classNames(false, null, undefined, "")).toBe("");
  });

  test("returns an empty string when called with no arguments", () => {
    expect(classNames()).toBe("");
  });

  test("supports the conditional-class pattern described in its doc comment", () => {
    const isActive = true;
    const isDisabled = false;

    expect(classNames("base", isActive && "is-active", isDisabled && "is-disabled")).toBe(
      "base is-active",
    );
  });
});

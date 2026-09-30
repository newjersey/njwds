import { describe, test, expect } from "vitest";
import { getStoryModalId } from "../../utils/storyModalId";

describe("getStoryModalId", () => {
  test("returns a stable id across repeated calls with the same canvasElement", () => {
    const canvasElement = document.createElement("div");

    const first = getStoryModalId(canvasElement);
    const second = getStoryModalId(canvasElement);

    expect(first).toBe(second);
  });

  test("returns a different id for a different canvasElement", () => {
    // Storybook's docs page renders the same story (same name) into two separate
    // canvases - a "primary" block and a "stories" list block - each with its own
    // canvasElement. IDs must not collide even though the story is the same.
    const primaryCanvasElement = document.createElement("div");
    const listCanvasElement = document.createElement("div");

    expect(getStoryModalId(primaryCanvasElement)).not.toBe(getStoryModalId(listCanvasElement));
  });

  test("returns an id usable as an HTML id attribute", () => {
    const id = getStoryModalId(document.createElement("div"));

    expect(id).toMatch(/^modal-[a-f0-9-]+$/);
  });
});

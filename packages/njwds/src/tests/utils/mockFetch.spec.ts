import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { initMockFetch } from "../../utils/mockFetch";

describe("initMockFetch", () => {
  const originalFetch = window.fetch;

  beforeEach(() => {
    // The implementation logs on every call; keep test output pristine.
    vi.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    window.fetch = originalFetch;
    vi.restoreAllMocks();
    vi.useRealTimers();
  });

  test("replaces window.fetch with a function", () => {
    initMockFetch({});

    expect(typeof window.fetch).toBe("function");
  });

  test("resolves with the mapped status and JSON body for a matching URL", async () => {
    initMockFetch({
      "https://api.com/rating": { status: 200, body: { message: "success" } },
    });

    const response = await window.fetch("https://api.com/rating");

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("application/json");
    await expect(response.json()).resolves.toEqual({ message: "success" });
  });

  test("distinguishes between multiple mapped URLs", async () => {
    initMockFetch({
      "https://api.com/rating": { status: 200, body: { message: "success" } },
      "https://api.com/comment": { status: 500, body: { message: "internal server error" } },
    });

    const ratingResponse = await window.fetch("https://api.com/rating");
    const commentResponse = await window.fetch("https://api.com/comment");

    expect(ratingResponse.status).toBe(200);
    expect(commentResponse.status).toBe(500);
    await expect(commentResponse.json()).resolves.toEqual({ message: "internal server error" });
  });

  test("resolves immediately when no responseDelay is given", async () => {
    initMockFetch({ "https://api.com/rating": { status: 200, body: {} } });

    const start = Date.now();
    await window.fetch("https://api.com/rating");

    expect(Date.now() - start).toBeLessThan(50);
  });

  test("waits for responseDelay before resolving", async () => {
    vi.useFakeTimers();
    initMockFetch({ "https://api.com/rating": { status: 200, body: {} } }, 1000);

    let resolved = false;
    void window.fetch("https://api.com/rating").then(() => {
      resolved = true;
    });

    await vi.advanceTimersByTimeAsync(999);
    expect(resolved).toBe(false);

    await vi.advanceTimersByTimeAsync(1);
    expect(resolved).toBe(true);
  });

  test("rejects when the requested URL has no mapped response", async () => {
    initMockFetch({ "https://api.com/rating": { status: 200, body: {} } });

    await expect(window.fetch("https://api.com/unmapped")).rejects.toThrow();
  });

  test("falls back to the default response status when status isn't a number", async () => {
    // initMockFetch is also called from feedbackApiMock.js, an untyped JS consumer,
    // so a non-number status is a real runtime possibility, not just a type escape hatch.
    initMockFetch({
      "https://api.com/rating": { status: "not-a-number" as unknown as number, body: {} },
    });

    const response = await window.fetch("https://api.com/rating");

    expect(response.status).toBe(200);
  });
});

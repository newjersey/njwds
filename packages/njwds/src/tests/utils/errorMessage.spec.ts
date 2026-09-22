import { describe, test, expect } from "vitest";
import { render } from "lit";
import { renderErrorMessage } from "../../utils/errorMessage";

function renderToContainer(id: string, message: string): HTMLDivElement {
  const container = document.createElement("div");
  render(renderErrorMessage(id, message), container);
  return container;
}

describe("renderErrorMessage", () => {
  test("renders the message text inside a role=alert element with the given id", () => {
    const container = renderToContainer("input-error", "This field is required");
    const alert = container.querySelector("#input-error");

    expect(alert).not.toBeNull();
    expect(alert?.getAttribute("role")).toBe("alert");
    expect(alert?.textContent).toBe("This field is required");
  });

  test("wraps the message in the expected container and message classes", () => {
    const container = renderToContainer("input-error", "This field is required");

    expect(container.querySelector(".nj-error-message-container")).not.toBeNull();
    expect(container.querySelector(".usa-error-message")).not.toBeNull();
  });

  test("renders a decorative, non-focusable error icon", () => {
    const container = renderToContainer("input-error", "This field is required");
    const icon = container.querySelector("svg.usa-icon");

    expect(icon?.getAttribute("aria-hidden")).toBe("true");
    expect(icon?.getAttribute("focusable")).toBe("false");
    expect(icon?.getAttribute("role")).toBe("img");
    expect(icon?.querySelector("use")?.getAttribute("href")).toBe("./img/sprite.svg#error");
  });

  test("reflects whatever id and message are passed in, not fixed values", () => {
    const container = renderToContainer("email-error", "Enter a valid email address");
    const alert = container.querySelector("#email-error");

    expect(alert?.textContent).toBe("Enter a valid email address");
  });

  test("renders message content as text, not HTML, to avoid injection", () => {
    const container = renderToContainer("xss-error", "<script>window.hacked = true</script>");
    const alert = container.querySelector("#xss-error");

    expect(alert?.innerHTML).not.toContain("<script>");
    expect(alert?.textContent).toBe("<script>window.hacked = true</script>");
  });
});

/**
 * Initializes a mock implementation of the `window.fetch` function that returns predefined responses.
 *
 * @param urlToMockResponseMap - Each mock response must have a `status` property (number) and a `body` property (object).
 * @param responseDelay - The delay in milliseconds before resolving the mock response.
 *
 * @example
 * const mockResponses = {
 *   "https://api.com/rating": {
 *     status: 200,
 *     body: { message: "success" },
 *   },
 *  "https://api.com/comment": {
 *     status: 500,
 *     body: { message: "internal server error" },
 *   }
 * };
 * initMockFetch(mockResponses, 1000);
 *
 */
export function initMockFetch(
  urlToMockResponseMap: Record<string, { status: number; body: unknown }>,
  responseDelay?: number,
): void {
  const originalFetch = window.fetch;

  window.fetch = async (...args: Parameters<typeof fetch>) => {
    const requestUrl = args[0] as string;
    const mockedResponse = urlToMockResponseMap[requestUrl];

    if (!mockedResponse) {
      return originalFetch(...args);
    }

    console.log("fetch called with args:", args);
    const { status, body } = mockedResponse;

    const mockResponse = new Response(JSON.stringify(body), {
      status: typeof status === "number" ? status : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("mocking response:", { body, status });
    const timeout = typeof responseDelay === "number" ? responseDelay : 0;

    return new Promise<Response>((resolve) => {
      setTimeout(() => resolve(mockResponse), timeout);
    });
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { fetch: origFetch } = window;

/**
 * Initializes a mock implementation of the `window.fetch` function that returns predefined responses.
 *
 * @param {Record<string, { status: number, body: unknown }>} urlToMockResponseMap - Each mock response must have a `status` property (number) and a `body` property (object).
 * @param {number} responseDelay - The delay in milliseconds before resolving the mock response.
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function initMockFetch(urlToMockResponseMap, responseDelay) {
  window.fetch = async (...args) => {
    console.log("fetch called with args:", args);
    const requestUrl = args[0];
    const { status, body } = urlToMockResponseMap[requestUrl];

    const mockResponse = new Response(JSON.stringify(body), {
      status: typeof status === "number" ? status : undefined,
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("mocking response:", { body, status });
    const timeout = typeof responseDelay === "number" ? responseDelay : 0;

    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), timeout);
    });
  };
}

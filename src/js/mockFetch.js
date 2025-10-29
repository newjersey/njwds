const { fetch: origFetch } = window;

/**
 * Initializes a mock implementation of the `window.fetch` function that returns predefined responses.
 *
 * @param {Record<string, {status: number, body: object}>} urlToMockResponseMap - Each mock response must have a `status` property (number) and a `body` property (object).
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
 * @throws {Error} Will log an error if the mock response does not generate a valid Response object.
 */
function initMockFetch(urlToMockResponseMap, responseDelay) {
  window.fetch = async (...args) => {
    console.log("fetch called with args:", args);
    const requestUrl = args[0];
    const { status, body } = urlToMockResponseMap[requestUrl]; 

    const mockResponse = new Response(
      JSON.stringify(body), {
        status: status,  
        headers: {
          'Content-Type': 'application/json'
        }
      })

    if (!(mockResponse instanceof Response)) {
      console.error("Could not mock fetch: mockResponse arg must be a Response object")
      return
    }
    console.log("mocking response:", { body, status })
    const timeout = typeof responseDelay === "number"
      ? responseDelay
      : 0;
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockResponse), timeout);
    });
  };
}

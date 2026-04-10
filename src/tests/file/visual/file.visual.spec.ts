import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-file--default&viewMode=docs&args=error%3A!false`,
  },
  {
    name: "error",
    url: `${BASE_URL}/iframe.html?id=components-file--default&viewMode=docs&args=error%3A!true`,
  },
];

runVisualSuite({
  suiteName: "File component",
  cases: TEST_CASES,
});

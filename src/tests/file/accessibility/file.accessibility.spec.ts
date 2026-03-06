import { runA11ySuite } from "../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "File (Component)",
  include: ".usa-form-group",
  cases: TEST_CASES,
});

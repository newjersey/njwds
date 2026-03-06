import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-file--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "File",
  include: ".usa-input",
  cases: TEST_CASES,
});

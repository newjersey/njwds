import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-select--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Select",
  include: ".usa-select",
  cases: TEST_CASES,
});

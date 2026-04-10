import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-step-indicator--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Step indicator",
  cases: TEST_CASES,
});

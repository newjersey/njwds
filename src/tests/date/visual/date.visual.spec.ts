import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=patterns-date--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Date",
  cases: TEST_CASES,
});

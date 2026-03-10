import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-date-range-picker--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Date Range Picker",
  cases: TEST_CASES,
});

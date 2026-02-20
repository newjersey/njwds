import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-table--basic&viewMode=story`,
  },
  {
    name: "borderless",
    url: `${BASE_URL}/iframe.html?id=elements-table--basic&viewMode=story&args=border%3A!false`,
  },
];

runVisualSuite({
  suiteName: "Table",
  cases: TEST_CASES,
});

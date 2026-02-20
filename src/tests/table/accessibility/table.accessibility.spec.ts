import { runA11ySuite } from "../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "Table component",
  include: ".usa-table",
  cases: TEST_CASES,
});

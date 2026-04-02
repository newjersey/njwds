import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=patterns-search--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `${BASE_URL}/iframe.html?id=patterns-search--default&viewMode=story&args=size:Big`,
  },
  {
    name: "Small",
    url: `${BASE_URL}/iframe.html?id=patterns-search--default&viewMode=story&args=size:Small`,
  },
];

runVisualSuite({
  suiteName: "Search",
  cases: TEST_CASES,
});

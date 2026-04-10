import { runA11ySuite } from "../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "Search",
  include: ".usa-search",
  cases: TEST_CASES,
});

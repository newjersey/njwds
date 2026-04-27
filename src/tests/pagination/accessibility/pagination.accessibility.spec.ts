import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-pagination--default&viewMode=story`,
  },
  {
    name: "Unbounded",
    url: `${BASE_URL}/iframe.html?id=components-pagination--default&viewMode=story&args=unbounded:true`,
  },
];

runA11ySuite({
  suiteName: "Pagination",
  include: ".usa-pagination",
  cases: TEST_CASES,
});

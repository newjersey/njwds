import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-tag--basic&viewMode=story`,
  },
  {
    name: "Big",
    url: `${BASE_URL}/iframe.html?id=components-tag--basic&viewMode=story&args=size:big`,
  },
];

runA11ySuite({
  suiteName: "Tag",
  include: ".usa-tag",
  cases: TEST_CASES,
});

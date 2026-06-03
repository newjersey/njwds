import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=patterns-search--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `/iframe.html?id=patterns-search--default&viewMode=story&args=size:Big`,
  },
  {
    name: "Small",
    url: `/iframe.html?id=patterns-search--default&viewMode=story&args=size:Small`,
  },
];

runA11ySuite({
  suiteName: "Search",
  include: ".usa-search",
  cases: TEST_CASES,
});

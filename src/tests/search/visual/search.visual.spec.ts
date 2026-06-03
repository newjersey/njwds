import { runVisualSuite } from "../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "Search",
  cases: TEST_CASES,
});

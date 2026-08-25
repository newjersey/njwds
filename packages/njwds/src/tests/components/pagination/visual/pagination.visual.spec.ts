import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-pagination--default&viewMode=story`,
  },
  {
    name: "Unbounded",
    url: `/iframe.html?id=components-pagination--default&viewMode=story&args=unbounded:true`,
  },
];

runVisualSuite({
  suiteName: "Pagination",
  cases: TEST_CASES,
});

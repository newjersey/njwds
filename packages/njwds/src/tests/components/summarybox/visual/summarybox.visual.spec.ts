import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-summary-box--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Summary Box",
  cases: TEST_CASES,
});

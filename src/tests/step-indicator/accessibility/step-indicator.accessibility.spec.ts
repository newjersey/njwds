import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-step-indicator--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Step indicator",
  include: ".usa-step-indicator",
  cases: TEST_CASES,
});

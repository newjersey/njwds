import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-step-indicator--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Step indicator",
  cases: TEST_CASES,
});

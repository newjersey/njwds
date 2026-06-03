import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=elements-range-slider--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Range slider",
  cases: TEST_CASES,
});

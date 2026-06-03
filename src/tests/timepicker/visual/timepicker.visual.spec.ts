import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-time-picker--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Time Picker",
  cases: TEST_CASES,
});

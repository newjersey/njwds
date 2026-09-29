import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-date-range-picker--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Date Range Picker",
  cases: TEST_CASES,
});

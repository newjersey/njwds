import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-memorable-date-picker--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Date",
  cases: TEST_CASES,
});

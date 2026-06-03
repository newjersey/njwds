import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-date--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Date",
  cases: TEST_CASES,
});

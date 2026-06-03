import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-name--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Name",
  cases: TEST_CASES,
});

import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-prose--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Prose",
  cases: TEST_CASES,
});

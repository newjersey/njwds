import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-side-navigation--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Sidenav",
  cases: TEST_CASES,
});

import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-header--default&viewMode=story`,
  },
  {
    name: "extended",
    url: `/iframe.html?id=components-header--extended&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Header",
  cases: TEST_CASES,
});

import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-tag--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `/iframe.html?id=components-tag--default&viewMode=story&args=size:big`,
  },
];
runVisualSuite({
  suiteName: "Tag",
  cases: TEST_CASES,
});

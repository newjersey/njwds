import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-graphic-list--default&viewMode=story`,
  },
  {
    name: "dark",
    url: `/iframe.html?id=components-graphic-list--default&viewMode=story&args=mode:dark`,
  },
];

runVisualSuite({
  suiteName: "GraphicList",
  cases: TEST_CASES,
});

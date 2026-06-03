import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-graphiclist--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "GraphicList",
  cases: TEST_CASES,
});

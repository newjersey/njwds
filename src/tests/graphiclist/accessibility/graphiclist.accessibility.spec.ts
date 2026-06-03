import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-graphiclist--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "GraphicList",
  include: ".usa-graphic-list",
  cases: TEST_CASES,
});

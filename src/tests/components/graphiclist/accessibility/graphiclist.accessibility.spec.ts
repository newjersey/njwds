import { runA11ySuite } from "../../../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "GraphicList",
  include: ".usa-graphic-list",
  cases: TEST_CASES,
});

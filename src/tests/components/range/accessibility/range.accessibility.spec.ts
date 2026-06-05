import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-range-slider--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Range slider",
  include: ".usa-range",
  cases: TEST_CASES,
});

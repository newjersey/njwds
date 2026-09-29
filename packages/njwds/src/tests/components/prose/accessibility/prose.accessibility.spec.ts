import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-prose--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Prose",
  include: ".usa-prose",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-name--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Name",
  include: ".usa-form",
  cases: TEST_CASES,
});

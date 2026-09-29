import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-side-navigation--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Sidenav",
  include: ".usa-sidenav",
  cases: TEST_CASES,
});

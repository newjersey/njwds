import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-time-picker--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Time Picker",
  include: ".usa-time-picker",
  cases: TEST_CASES,
});

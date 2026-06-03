import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-button-group--default&viewMode=story`,
  },
  {
    name: "segmented",
    url: `/iframe.html?id=patterns-button-group--default&viewMode=story&args=segmented:true`,
  },
];

runA11ySuite({
  suiteName: "Button Group",
  include: ".usa-button-group",
  cases: TEST_CASES,
});

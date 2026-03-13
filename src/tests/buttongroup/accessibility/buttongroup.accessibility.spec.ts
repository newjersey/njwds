import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=patterns-button-group--default&viewMode=story`,
  },
  {
    name: "segmented",
    url: `${BASE_URL}/iframe.html?id=patterns-button-group--default&viewMode=story&args=segmented:true`,
  },
];

runA11ySuite({
  suiteName: "Button Group",
  include: ".usa-button-group",
  cases: TEST_CASES,
});

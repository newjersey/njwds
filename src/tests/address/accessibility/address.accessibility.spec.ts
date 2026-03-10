import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=patterns-address--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Address",
  include: ".usa-form",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-summary-box--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Summary Box",
  include: ".usa-summary-box",
  cases: TEST_CASES,
});

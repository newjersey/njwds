import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-summary-box--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Summary Box",
  include: ".usa-summary-box",
  cases: TEST_CASES,
});

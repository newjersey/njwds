import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-hero--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Hero component",
  include: ".usa-hero",
  cases: TEST_CASES,
});

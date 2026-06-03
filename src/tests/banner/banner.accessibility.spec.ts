import { runA11ySuite } from "../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-banner--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Banner",
  include: ".nj-banner",
  cases: TEST_CASES,
});

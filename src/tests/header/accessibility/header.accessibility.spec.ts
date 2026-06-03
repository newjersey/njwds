import { runA11ySuite } from "../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-header--default&viewMode=story`,
  },
  {
    name: "extended",
    url: `/iframe.html?id=components-header--extended&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Header",
  include: ".usa-header",
  cases: TEST_CASES,
});

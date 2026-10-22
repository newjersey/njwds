import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-divider-web-component--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Divider",
  include: "grove-divider",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-divider--default&viewMode=story`,
  },
  {
    name: "Default (Web Component)",
    url: `/iframe.html?id=web-components-divider--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Divider",
  cases: TEST_CASES,
});

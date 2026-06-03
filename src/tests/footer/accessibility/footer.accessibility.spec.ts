import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-footer--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `/iframe.html?id=components-footer--default&viewMode=story&args=variant:Big`,
  },
  {
    name: "Slim",
    url: `/iframe.html?id=components-footer--default&viewMode=story&args=variant:Slim`,
  },
];

runA11ySuite({
  suiteName: "Footer",
  include: ".usa-footer",
  cases: TEST_CASES,
});

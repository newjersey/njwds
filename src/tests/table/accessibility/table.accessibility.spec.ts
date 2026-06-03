import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-table--default&viewMode=story`,
  },
  {
    name: "borderless",
    url: `/iframe.html?id=components-table--default&viewMode=story&args=border:false`,
  },
];

runA11ySuite({
  suiteName: "Table",
  include: ".usa-table",
  cases: TEST_CASES,
});

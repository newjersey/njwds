import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-processlist--default&viewMode=story`,
  },
  {
    name: "No content",
    url: `/iframe.html?id=components-processlist--default&viewMode=story&args=content:false`,
  },
  {
    name: "custom sizing",
    url: `/iframe.html?id=components-processlist--default&viewMode=story&args=customSizing:true`,
  },
];

runA11ySuite({
  suiteName: "Process List",
  include: ".usa-process-list",
  cases: TEST_CASES,
});

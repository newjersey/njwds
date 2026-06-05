import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-process-list--default&viewMode=story`,
  },
  {
    name: "No content",
    url: `/iframe.html?id=components-process-list--default&viewMode=story&args=content:false`,
  },
  {
    name: "custom sizing",
    url: `/iframe.html?id=components-process-list--default&viewMode=story&args=customSizing:true`,
  },
];

runVisualSuite({
  suiteName: "Process list",
  cases: TEST_CASES,
});

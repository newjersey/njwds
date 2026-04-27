import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-processlist--default&viewMode=story`,
  },
  {
    name: "No content",
    url: `${BASE_URL}/iframe.html?id=components-processlist--default&viewMode=story&args=content:false`,
  },
  {
    name: "custom sizing",
    url: `${BASE_URL}/iframe.html?id=components-processlist--default&viewMode=story&args=customSizing:true`,
  },
];

runVisualSuite({
  suiteName: "Process List",
  cases: TEST_CASES,
});

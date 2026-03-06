import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-select--default&viewMode=story&args=helperText:true;required:true`,
  },
  {
    name: "error",
    url: `${BASE_URL}/iframe.html?id=elements-select--default&viewMode=story&args=error:true;`,
  },
];

runVisualSuite({
  suiteName: "Select",
  cases: TEST_CASES,
});

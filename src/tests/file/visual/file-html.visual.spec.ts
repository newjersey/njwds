import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-file--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "File",
  cases: TEST_CASES,
});

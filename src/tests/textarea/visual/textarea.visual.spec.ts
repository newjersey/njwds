import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-textarea--default&viewMode=docs`,
  },
  {
    name: "error",
    url: `${BASE_URL}/iframe.html?id=elements-textarea--default&viewMode=docs&args=error%3A!true`,
  },
  {
    name: "success",
    url: `${BASE_URL}/iframe.html?id=elements-textarea--default&viewMode=docs&args=success%3A!true`,
  },
];

runVisualSuite({
  suiteName: "Textarea",
  cases: TEST_CASES,
});

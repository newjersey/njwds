import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-textarea--default&viewMode=docs&args=helperText:true;required:true`,
  },
  {
    name: "error",
    url: `${BASE_URL}/iframe.html?id=elements-textarea--default&viewMode=docs&args=error:true`,
  },
  {
    name: "success",
    url: `${BASE_URL}/iframe.html?id=elements-textarea--default&viewMode=docs&args=success:true`,
  },
];

runVisualSuite({
  suiteName: "Textarea",
  cases: TEST_CASES,
});

import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=elements-textarea--default&viewMode=docs&args=helperText:true;required:true`,
  },
  {
    name: "error",
    url: `/iframe.html?id=elements-textarea--default&viewMode=docs&args=error:true`,
  },
  {
    name: "success",
    url: `/iframe.html?id=elements-textarea--default&viewMode=docs&args=success:true`,
  },
];

runVisualSuite({
  suiteName: "Textarea",
  cases: TEST_CASES,
});

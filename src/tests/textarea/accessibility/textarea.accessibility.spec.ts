import { runA11ySuite } from "../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "Textarea",
  include: ".usa-textarea",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-select--default&viewMode=story&args=helperText:true;required:true`,
  },
  {
    name: "error",
    url: `/iframe.html?id=components-select--default&viewMode=story&args=error:true;`,
  },
];

runA11ySuite({
  suiteName: "Select",
  include: ".usa-select",
  cases: TEST_CASES,
});

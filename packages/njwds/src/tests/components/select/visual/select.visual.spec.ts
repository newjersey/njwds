import { runVisualSuite } from "../../../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "Select",
  cases: TEST_CASES,
});

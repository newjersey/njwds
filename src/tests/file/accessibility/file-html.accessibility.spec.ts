import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-file-input--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "File",
  include: ".usa-input",
  cases: TEST_CASES,
});

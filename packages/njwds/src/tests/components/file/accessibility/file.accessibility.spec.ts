import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-file--default&viewMode=docs&args=error%3A!false`,
  },
  {
    name: "error",
    url: `/iframe.html?id=components-file--default&viewMode=docs&args=error%3A!true`,
  },
];

runA11ySuite({
  suiteName: "File (component)",
  include: ".usa-form-group",
  cases: TEST_CASES,
});

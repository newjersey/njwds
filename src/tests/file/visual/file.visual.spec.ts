import { runVisualSuite } from "../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "File component",
  cases: TEST_CASES,
});

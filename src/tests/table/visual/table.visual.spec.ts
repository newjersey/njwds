import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=elements-table--default&viewMode=story`,
  },
  {
    name: "borderless",
    url: `/iframe.html?id=elements-table--default&viewMode=story&args=border:false`,
  },
];

runVisualSuite({
  suiteName: "Table",
  cases: TEST_CASES,
});

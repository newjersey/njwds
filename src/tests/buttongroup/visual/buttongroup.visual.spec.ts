import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-button-group--default&viewMode=story`,
  },
  {
    name: "segmented",
    url: `/iframe.html?id=patterns-button-group--default&viewMode=story&args=segmented:true`,
  },
];

runVisualSuite({
  suiteName: "Button Group",
  cases: TEST_CASES,
});

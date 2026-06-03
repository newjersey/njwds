import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all test cases with isOpen:!true to show modal in screenshots
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-modal--default&viewMode=story&args=isOpen:!true`,
  },
  {
    name: "Default-Large",
    url: `/iframe.html?id=components-modal--default&viewMode=story&args=isOpen:!true;size:large`,
  },
];

runVisualSuite({
  suiteName: "Modal",
  cases: TEST_CASES,
});

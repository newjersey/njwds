import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all test cases with isOpen:!true to show modal in screenshots
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-modal--default&viewMode=story&args=isOpen:!true`,
  },
  {
    name: "Default-Large",
    url: `${BASE_URL}/iframe.html?id=components-modal--default&viewMode=story&args=isOpen:!true;size:large`,
  },
];

runVisualSuite({
  suiteName: "Modal",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Same test cases as visual tests
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

runA11ySuite({
  suiteName: "Modal",
  include: ".usa-modal",
  cases: TEST_CASES,
});

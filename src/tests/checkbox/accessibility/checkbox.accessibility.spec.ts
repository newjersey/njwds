import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-checkbox--default&viewMode=story&globals=&args=`,
  },
  {
    name: "tile",
    url: `${BASE_URL}/iframe.html?id=elements-checkbox--tile&viewMode=story&globals=&args=`,
  },
];

runA11ySuite({
  suiteName: "Checkbox",
  include: ".usa-checkbox",
  cases: TEST_CASES,
});

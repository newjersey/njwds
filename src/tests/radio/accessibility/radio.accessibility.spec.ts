import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-radio--default&viewMode=story&globals=&args=`,
  },
  {
    name: "tile",
    url: `${BASE_URL}/iframe.html?id=elements-radio--tile&viewMode=story&globals=&args=`,
  },
];

runA11ySuite({
  suiteName: "Radio",
  include: ".usa-radio",
  cases: TEST_CASES,
});

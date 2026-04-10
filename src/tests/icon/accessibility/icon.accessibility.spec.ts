import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-icon--basic&viewMode=story`,
  },
  {
    name: "Size 1",
    url: `${BASE_URL}/iframe.html?id=components-icon--basic&viewMode=story&args=size:1`,
  },
  {
    name: "Size 5",
    url: `${BASE_URL}/iframe.html?id=components-icon--basic&viewMode=story&args=size:5`,
  },
  {
    name: "Size 9",
    url: `${BASE_URL}/iframe.html?id=components-icon--basic&viewMode=story&args=size:9`,
  },
];

runA11ySuite({
  suiteName: "Icon",
  include: ".usa-icon",
  cases: TEST_CASES,
});

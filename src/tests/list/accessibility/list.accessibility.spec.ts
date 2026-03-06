import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "ordered",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList`,
  },
  {
    name: "unordered",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AUnordered%2BList`,
  },
  {
    name: "unstyled",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type%3AOrdered%2BList%3Bstyled%3A!true`,
  },
];

runA11ySuite({
  suiteName: "List component",
  include: ".usa-list",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "light",
    url: `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Alight%3Bexternal%3A!true`,
  },
  {
    name: "dark",
    url: `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Adark%3Bexternal%3A!true`,
  },
];

runA11ySuite({
  suiteName: "Link component",
  include: ".usa-link",
  cases: TEST_CASES,
});

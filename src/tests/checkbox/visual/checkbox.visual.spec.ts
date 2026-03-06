import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Alight%3Bexternal%3A!true`,
  },
  {
    name: "tile",
    url: `${BASE_URL}/iframe.html?id=elements-link--basic&viewMode=story&globals=&args=theme%3Adark%3Bexternal%3A!true`,
  },
];

runVisualSuite({
  suiteName: "Checkbox",
  cases: TEST_CASES,
});

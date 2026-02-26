import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-tag--basic&viewMode=story`,
  },
  {
    name: "Big",
    url: `${BASE_URL}/iframe.html?id=components-tag--basic&viewMode=story&args=size%3Abig`,
  },
];
runVisualSuite({
  suiteName: "Tag",
  cases: TEST_CASES,
});

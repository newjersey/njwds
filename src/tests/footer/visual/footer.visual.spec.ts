import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-footer--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `${BASE_URL}/iframe.html?id=components-footer--default&viewMode=story&args=variant:Big`,
  },
  {
    name: "Slim",
    url: `${BASE_URL}/iframe.html?id=components-footer--default&viewMode=story&args=variant:Slim`,
  },
];

runVisualSuite({
  suiteName: "Footer",
  cases: TEST_CASES,
});

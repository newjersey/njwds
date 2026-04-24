import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-header--default&viewMode=story`,
  },
  {
    name: "extended",
    url: `${BASE_URL}/iframe.html?id=components-header--extended&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Header",
  cases: TEST_CASES,
});

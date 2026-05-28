import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-in-page-navigation--default&viewMode=story`,
  },
  {
    name: "Isolated",
    url: `${BASE_URL}/iframe.html?id=components-in-page-navigation--default&viewMode=story&args=hideContentInStorybook:true`,
  },
];

runVisualSuite({
  suiteName: "In-page Navigation",
  cases: TEST_CASES,
});

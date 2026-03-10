import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=patterns-sign-in-form--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Sign In",
  cases: TEST_CASES,
});

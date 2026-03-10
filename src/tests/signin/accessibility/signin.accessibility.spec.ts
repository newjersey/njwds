import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=patterns-sign-in-form--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Sign In",
  include: ".usa-form",
  cases: TEST_CASES,
});

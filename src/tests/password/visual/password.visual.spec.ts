import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-password-reset--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Password",
  cases: TEST_CASES,
});

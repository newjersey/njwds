import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=templates-sign-in-form--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Sign In",
  cases: TEST_CASES,
});

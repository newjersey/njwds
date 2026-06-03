import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=patterns-password-reset--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Password",
  include: ".usa-form",
  cases: TEST_CASES,
});

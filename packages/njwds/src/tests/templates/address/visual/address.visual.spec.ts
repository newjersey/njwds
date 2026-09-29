import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=templates-address-form--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Address",
  cases: TEST_CASES,
});

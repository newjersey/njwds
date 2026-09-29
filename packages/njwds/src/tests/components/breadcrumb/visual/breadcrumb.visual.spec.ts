import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-breadcrumb--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Breadcrumb",
  cases: TEST_CASES,
});

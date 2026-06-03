import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-in-page-navigation--default&viewMode=story`,
  },
  {
    name: "Isolated",
    url: `/iframe.html?id=components-in-page-navigation--default&viewMode=story&args=hideContentInStorybook:true`,
  },
];

runVisualSuite({
  suiteName: "In-page Navigation",
  cases: TEST_CASES,
});

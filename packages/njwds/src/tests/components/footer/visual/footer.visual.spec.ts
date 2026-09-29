import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-footer--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `/iframe.html?id=components-footer--default&viewMode=story&args=variant:Big`,
  },
  {
    name: "Slim",
    url: `/iframe.html?id=components-footer--default&viewMode=story&args=variant:Slim`,
  },
];

runVisualSuite({
  suiteName: "Footer",
  cases: TEST_CASES,
});

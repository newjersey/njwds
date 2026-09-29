import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-combo-box--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Combobox",
  cases: TEST_CASES,
});

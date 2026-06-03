import { runA11ySuite } from "../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-combobox--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Combobox",
  include: ".usa-combo-box",
  cases: TEST_CASES,
});

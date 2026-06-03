import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-checkbox--default&viewMode=story`,
  },
  {
    name: "tile",
    url: `/iframe.html?id=components-checkbox--tile&viewMode=story`,
  },
  {
    name: "default - kitchen sink",
    url: `/iframe.html?id=components-checkbox--default&viewMode=story&globals=&args=error:true;helperText:true;required:true`,
  },
  {
    name: "tile - kitchen sink",
    url: `/iframe.html?id=components-checkbox--tile&viewMode=story&globals=&args=error:true;helperText:true;required:true`,
  },
];

runVisualSuite({
  suiteName: "Checkbox",
  cases: TEST_CASES,
});

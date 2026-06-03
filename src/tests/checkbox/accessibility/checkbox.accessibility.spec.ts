import { runA11ySuite } from "../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "Checkbox",
  include: ".usa-checkbox",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-radio--default&viewMode=story`,
  },
  {
    name: "tile",
    url: `/iframe.html?id=components-radio--tile&viewMode=story`,
  },
  {
    name: "default - kitchen sink",
    url: `/iframe.html?id=components-radio--default&viewMode=story&globals=&args=error:true;helperText:true;required:true`,
  },
  {
    name: "tile - kitchen sink",
    url: `/iframe.html?id=components-radio--tile&viewMode=story&globals=&args=error:true;helperText:true;required:true`,
  },
];

runA11ySuite({
  suiteName: "Radio",
  include: ".usa-radio",
  cases: TEST_CASES,
});

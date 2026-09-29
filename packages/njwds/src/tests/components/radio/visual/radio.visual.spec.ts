import { runVisualSuite } from "../../../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "Radio",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-tag--default&viewMode=story`,
  },
  {
    name: "Big",
    url: `/iframe.html?id=components-tag--default&viewMode=story&args=size:big`,
  },
];

runA11ySuite({
  suiteName: "Tag",
  include: ".usa-tag",
  cases: TEST_CASES,
});

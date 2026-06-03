import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "ordered",
    url: `/iframe.html?id=components-list--default&viewMode=story&args=type:Ordered%2BList`,
  },
  {
    name: "unordered",
    url: `/iframe.html?id=components-list--default&viewMode=story&args=type:Unordered%2BList`,
  },
  {
    name: "unstyled",
    url: `/iframe.html?id=components-list--default&viewMode=story&args=type:Ordered%2BList;styled:true`,
  },
];

runA11ySuite({
  suiteName: "List",
  include: ".usa-list",
  cases: TEST_CASES,
});

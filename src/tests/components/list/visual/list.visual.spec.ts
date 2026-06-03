import { runVisualSuite } from "../../../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "List",
  cases: TEST_CASES,
});

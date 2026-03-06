import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "ordered",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type:Ordered%2BList`,
  },
  {
    name: "unordered",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type:Unordered%2BList`,
  },
  {
    name: "unstyled",
    url: `${BASE_URL}/iframe.html?id=elements-list--basic&viewMode=story&args=type:Ordered%2BList;styled:true`,
  },
];

runVisualSuite({
  suiteName: "List",
  cases: TEST_CASES,
});

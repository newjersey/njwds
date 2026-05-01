import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default Collection",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story`,
  },
  {
    name: "Collection tags hidden",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=showTags:false`,
  },
  {
    name: "Collection content hidden",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=showContent:false`,
  },
  {
    name: "Collection media thumbnail",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=media:thumbnail`,
  },
  {
    name: "Collection media calendar",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=media:calendar`,
  },
];

runVisualSuite({
  suiteName: "Collection",
  cases: TEST_CASES,
});

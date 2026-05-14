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
    name: "Collection description hidden",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=showDescription:false`,
  },
  {
    name: "Collection type to thumbnail",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=type:media`,
  },
  {
    name: "Collection type to calendar",
    url: `${BASE_URL}/iframe.html?id=components-collection--default&viewMode=story&args=type:calendar`,
  },
];

runVisualSuite({
  suiteName: "Collection",
  cases: TEST_CASES,
});

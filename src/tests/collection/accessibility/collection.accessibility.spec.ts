import { runA11ySuite } from "../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "Collection",
  include: ".usa-collection",
  cases: TEST_CASES,
});

import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default Collection",
    url: `/iframe.html?id=components-collection--default&viewMode=story`,
  },
  {
    name: "Collection tags hidden",
    url: `/iframe.html?id=components-collection--default&viewMode=story&args=showTags:false`,
  },
  {
    name: "Collection description hidden",
    url: `/iframe.html?id=components-collection--default&viewMode=story&args=showDescription:false`,
  },
  {
    name: "Collection type to thumbnail",
    url: `/iframe.html?id=components-collection--default&viewMode=story&args=type:media`,
  },
  {
    name: "Collection type to calendar",
    url: `/iframe.html?id=components-collection--default&viewMode=story&args=type:calendar`,
  },
];

runA11ySuite({
  suiteName: "Collection",
  include: ".usa-collection",
  cases: TEST_CASES,
});

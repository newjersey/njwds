import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-icon-list--default&viewMode=story`,
  },
  {
    name: "Rich Text",
    url: `${BASE_URL}/iframe.html?id=components-icon-list--default&viewMode=story&args=richtext:true`,
  },
  {
    name: "Large Size",
    url: `${BASE_URL}/iframe.html?id=components-icon-list--default&viewMode=story&args=largeSize:true`,
  },
  {
    name: "Rich Text and Large Size",
    url: `${BASE_URL}/iframe.html?id=components-icon-list--default&viewMode=story&args=richtext:true&args=largeSize:true`,
  },
];

runA11ySuite({
  suiteName: "Icon List",
  include: ".usa-icon-list",
  cases: TEST_CASES,
});

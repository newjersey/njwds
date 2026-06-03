import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story`,
  },
  {
    name: "Rich Text",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=richtext:true`,
  },
  {
    name: "Large Size",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=largeSize:true`,
  },
  {
    name: "Rich Text and Large Size",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=richtext:true&args=largeSize:true`,
  },
];

runA11ySuite({
  suiteName: "Icon List",
  include: ".usa-icon-list",
  cases: TEST_CASES,
});

import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=richContent:false`,
  },
  {
    name: "Rich Text",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=richContent:true`,
  },
  {
    name: "Large Size",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=size%3Alg`,
  },
  {
    name: "Rich Text and Large Size",
    url: `/iframe.html?id=components-icon-list--default&viewMode=story&args=richContent%3A!true%3Bsize%3Alg`,
  },
];

runVisualSuite({
  suiteName: "Icon List",
  cases: TEST_CASES,
});

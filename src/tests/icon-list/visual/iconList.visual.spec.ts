import { runVisualSuite } from "../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-icon-list-default&viewMode=story`,
  },
  {
    name: "Rich Text",
    url: `/iframe.html?id=components-icon-list-default&viewMode=story&args=richtext:true`,
  },
  {
    name: "Large Size",
    url: `/iframe.html?id=components-icon-list-default&viewMode=story&args=largeSize:true`,
  },
  {
    name: "Rich Text and Large Size",
    url: `/iframe.html?id=components-icon-list-default&viewMode=story&args=richtext:true&args=largeSize:true`,
  },
];

runVisualSuite({
  suiteName: "Icon List",
  cases: TEST_CASES,
});

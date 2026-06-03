import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-card--default&viewMode=story`,
  },
  {
    name: "Flag",
    url: `/iframe.html?id=components-card--default&viewMode=story&args=layout:Flag;flagPositionRight:false`,
  },
  {
    name: "Flag: Right",
    url: `/iframe.html?id=components-card--default&viewMode=story&args=layout:Flag;flagPositionRight:true`,
  },
  {
    name: "Media: False",
    url: `/iframe.html?id=components-card--default&viewMode=story&args=media:false`,
  },
  {
    name: "Media: Extend, false",
    url: `/iframe.html?id=components-card--default&viewMode=story&args=mediaExtend:false;media:true`,
  },
];
runVisualSuite({
  suiteName: "Card",
  cases: TEST_CASES,
});

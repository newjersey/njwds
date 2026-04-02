import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-card--default&viewMode=story`,
  },
  {
    name: "Flag",
    url: `${BASE_URL}/iframe.html?id=components-card--default&viewMode=story&args=layout:Flag;`,
  },
  {
    name: "Flag: Right",
    url: `${BASE_URL}/iframe.html?id=components-card--default&viewMode=story&args=layout:Flag;`,
  },
  {
    name: "Media: False",
    url: `${BASE_URL}/iframe.html?id=components-card--default&viewMode=story&args=media:false`,
  },
  {
    name: "Media: Inset",
    url: `${BASE_URL}/iframe.html?id=components-card--default&viewMode=story&args=mediaInset:true;media:true`,
  },
];
runVisualSuite({
  suiteName: "Card",
  cases: TEST_CASES,
});

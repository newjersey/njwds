import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-in-page-navigation--default&viewMode=story`,
  },
  {
    name: "Isolated",
    url: `${BASE_URL}/iframe.html?id=components-in-page-navigation--default&viewMode=story&args=hideContentInStorybook:true`,
  },
];

runA11ySuite({
  suiteName: "In-page Navigation",
  include: ".usa-in-page-nav-container",
  cases: TEST_CASES,
});

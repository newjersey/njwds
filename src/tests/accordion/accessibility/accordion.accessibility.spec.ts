import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-accordion--default&viewMode=story`,
  },
  {
    name: "bordered",
    url: `${BASE_URL}/iframe.html?id=components-accordion--bordered&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Accordion component",
  include: ".usa-accordion",
  cases: TEST_CASES,
});

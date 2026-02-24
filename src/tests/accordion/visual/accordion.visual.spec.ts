import { runVisualSuite } from "../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "Accordion",
  cases: TEST_CASES,
});

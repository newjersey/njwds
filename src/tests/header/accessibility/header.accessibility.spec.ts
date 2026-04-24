import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-header--default&viewMode=story`,
  },
  {
    name: "extended",
    url: `${BASE_URL}/iframe.html?id=components-header--extended&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Header",
  include: ".usa-header",
  cases: TEST_CASES,
});

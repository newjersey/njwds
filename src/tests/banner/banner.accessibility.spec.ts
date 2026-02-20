import { runA11ySuite } from "../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-banner&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Banner component",
  include: ".nj-banner",
  cases: TEST_CASES,
});

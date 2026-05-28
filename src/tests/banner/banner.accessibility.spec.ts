import { runA11ySuite } from "../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-banner--default&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Banner",
  include: ".nj-banner",
  cases: TEST_CASES,
});

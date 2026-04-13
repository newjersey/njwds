import { runA11ySuite } from "../../utils/runA11ySuite";

const BASE_URL = "http://localhost:6006";

const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-hero--basic&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Hero component",
  include: ".usa-hero",
  cases: TEST_CASES,
});

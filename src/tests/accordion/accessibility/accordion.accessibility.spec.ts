import { runA11ySuite } from "../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-accordion--default&viewMode=story`,
  },
  {
    name: "bordered",
    url: `/iframe.html?id=components-accordion--bordered&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Accordion",
  include: ".usa-accordion",
  cases: TEST_CASES,
});

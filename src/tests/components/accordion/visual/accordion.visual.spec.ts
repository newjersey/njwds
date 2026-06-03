import { runVisualSuite } from "../../../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "Accordion",
  cases: TEST_CASES,
});

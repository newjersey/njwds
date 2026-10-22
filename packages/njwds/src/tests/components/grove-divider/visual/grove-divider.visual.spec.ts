import { runVisualSuite } from "../../../../utils/runVisualSuite";

const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-divider-web-component--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Divider",
  cases: TEST_CASES,
});

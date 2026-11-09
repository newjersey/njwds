import { runVisualSuite } from "../../../../utils/runVisualSuite";

const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-divider--default&viewMode=story`,
  },
  {
    name: "Default (Web Component)",
    url: `/iframe.html?id=web-components-divider--default&viewMode=story`,
  },
  {
    name: "Default (React)",
    url: `/iframe.html?id=react-components-divider--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "Divider",
  cases: TEST_CASES,
});

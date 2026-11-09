import { runA11ySuite } from "../../../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "Divider",
  include: "#storybook-root",
  cases: TEST_CASES,
});

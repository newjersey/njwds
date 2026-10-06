import { runVisualSuite } from "../../../../utils/runVisualSuite";

const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-identifier-web-component--default&viewMode=story`,
  },
  {
    name: "Spanish",
    url: `/iframe.html?id=components-identifier-web-component--spanish&viewMode=story`,
  },
  {
    name: "Disclaimer",
    url: `/iframe.html?id=components-identifier-web-component--disclaimer&viewMode=story`,
  },
  {
    name: "No Logo",
    url: `/iframe.html?id=components-identifier-web-component--default&viewMode=story&args=hideLogo:true`,
  },
  {
    name: "Multiple Logos",
    url: `/iframe.html?id=components-identifier-web-component--multiple-logos&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "NJ Identifier",
  cases: TEST_CASES,
});

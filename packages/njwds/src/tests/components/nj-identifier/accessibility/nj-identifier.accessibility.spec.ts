import { runA11ySuite } from "../../../../utils/runA11ySuite";

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

runA11ySuite({
  suiteName: "NJ Identifier",
  include: "nj-identifier",
  cases: TEST_CASES,
});

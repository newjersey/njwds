import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=web-components-nj-identifier--default&viewMode=story`,
  },
  {
    name: "Spanish",
    url: `/iframe.html?id=web-components-nj-identifier--spanish&viewMode=story`,
  },
  {
    name: "Disclaimer",
    url: `/iframe.html?id=web-components-nj-identifier--disclaimer&viewMode=story`,
  },
  {
    name: "No Logo",
    url: `/iframe.html?id=web-components-nj-identifier--default&viewMode=story&args=hideLogo:true`,
  },
  {
    name: "Multiple Logos",
    url: `/iframe.html?id=web-components-nj-identifier--multiple-logos&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "NJ Identifier",
  include: "nj-identifier",
  cases: TEST_CASES,
});

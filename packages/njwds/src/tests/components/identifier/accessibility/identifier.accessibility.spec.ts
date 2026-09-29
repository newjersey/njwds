import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-identifier--default&viewMode=story`,
  },
  {
    name: "Spanish",
    url: `/iframe.html?id=components-identifier--default&viewMode=story&args=language:Spanish`,
  },
  {
    name: "No Logos",
    url: `/iframe.html?id=components-identifier--default&viewMode=story&args=logos:None`,
  },
  {
    name: "Multiple Logos",
    url: `/iframe.html?id=components-identifier--default&viewMode=story&args=logos:Multiple`,
  },
  {
    name: "With Taxpayer Disclaimer",
    url: `/iframe.html?id=components-identifier--default&viewMode=story&args=showTaxpayerDisclaimer:true`,
  },
];

runA11ySuite({
  suiteName: "Identifier",
  include: ".usa-identifier",
  cases: TEST_CASES,
});

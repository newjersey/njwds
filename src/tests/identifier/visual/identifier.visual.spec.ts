import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story`,
  },
  {
    name: "Spanish",
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=language:Spanish`,
  },
  {
    name: "No Logos",
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=logos:None`,
  },
  {
    name: "Multiple Logos",
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=logos:Multiple`,
  },
  {
    name: "With Taxpayer Disclaimer",
    url: `${BASE_URL}/iframe.html?id=components-identifier--default&viewMode=story&args=showTaxpayerDisclaimer:true`,
  },
];

runVisualSuite({
  suiteName: "Identifier",
  cases: TEST_CASES,
});

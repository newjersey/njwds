import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `${BASE_URL}/iframe.html?id=components-alert--basic&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Info",
    url: `${BASE_URL}/iframe.html?id=components-alert--info&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Warning",
    url: `${BASE_URL}/iframe.html?id=components-alert--warning&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Success",
    url: `${BASE_URL}/iframe.html?id=components-alert--success&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Error",
    url: `${BASE_URL}/iframe.html?id=components-alert--error&viewMode=story&args=icon%3A!true`,
  },
];

runVisualSuite({
  suiteName: "Alert",
  cases: TEST_CASES,
});

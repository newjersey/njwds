import { runVisualSuite } from "../../utils/runVisualSuite";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story`,
  },
  {
    name: "dark",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "danger",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "secondary - dark",
    url: `${BASE_URL}/iframe.html?id=elements-button--secondary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "secondary - danger",
    url: `${BASE_URL}/iframe.html?id=elements-button--secondary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "secondary",
    url: `${BASE_URL}/iframe.html?id=elements-button--secondary&viewMode=story`,
  },
  {
    name: "tertiary - dark",
    url: `${BASE_URL}/iframe.html?id=elements-button--tertiary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "tertiary - danger",
    url: `${BASE_URL}/iframe.html?id=elements-button--tertiary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "tertiary",
    url: `${BASE_URL}/iframe.html?id=elements-button--tertiary&viewMode=story`,
  },
  {
    name: "icon",
    url: `${BASE_URL}/iframe.html?id=elements-button--primary&viewMode=story&globals=&args=icon%3A!true`,
  },
];

runVisualSuite({
  suiteName: "Button",
  cases: TEST_CASES,
});

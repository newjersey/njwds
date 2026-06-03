import { runA11ySuite } from "../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "Info",
    url: `/iframe.html?id=components-alert--info&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Warning",
    url: `/iframe.html?id=components-alert--warning&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Success",
    url: `/iframe.html?id=components-alert--success&viewMode=story&args=icon%3A!true`,
  },
  {
    name: "Error",
    url: `/iframe.html?id=components-alert--error&viewMode=story&args=icon%3A!true`,
  },
];

runA11ySuite({
  suiteName: "Alert",
  include: ".usa-alert",
  cases: TEST_CASES,
});

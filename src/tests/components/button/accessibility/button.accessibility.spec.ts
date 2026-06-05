import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-button--primary&viewMode=story`,
  },
  {
    name: "dark",
    url: `/iframe.html?id=components-button--primary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "danger",
    url: `/iframe.html?id=components-button--primary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "secondary - dark",
    url: `/iframe.html?id=components-button--secondary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "secondary - danger",
    url: `/iframe.html?id=components-button--secondary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "secondary",
    url: `/iframe.html?id=components-button--secondary&viewMode=story`,
  },
  {
    name: "tertiary - dark",
    url: `/iframe.html?id=components-button--tertiary&viewMode=story&args=theme%3Adark`,
  },
  {
    name: "tertiary - danger",
    url: `/iframe.html?id=components-button--tertiary&viewMode=story&args=theme%3Adanger`,
  },
  {
    name: "tertiary",
    url: `/iframe.html?id=components-button--tertiary&viewMode=story`,
  },
  {
    name: "icon",
    url: `/iframe.html?id=components-button--primary&viewMode=story&globals=&args=icon%3A!true`,
  },
];

runA11ySuite({
  suiteName: "Button",
  include: ".usa-button",
  cases: TEST_CASES,
});

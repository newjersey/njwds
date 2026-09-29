import { runVisualSuite } from "../../../../utils/runVisualSuite";

const TEST_CASES = [
  {
    name: "Info",
    url: `/iframe.html?id=components-site-alert--info&viewMode=story`,
  },
  {
    name: "Emergency",
    url: `/iframe.html?id=components-site-alert--emergency&viewMode=story`,
  },
  {
    name: "NoHeading",
    url: `/iframe.html?id=components-site-alert--no-heading&viewMode=story`,
  },
  {
    name: "WithList",
    url: `/iframe.html?id=components-site-alert--with-list&viewMode=story`,
  },
  {
    name: "Slim",
    url: `/iframe.html?id=components-site-alert--slim&viewMode=story`,
  },
  {
    name: "NoIcon",
    url: `/iframe.html?id=components-site-alert--no-icon&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "SiteAlert",
  cases: TEST_CASES,
});

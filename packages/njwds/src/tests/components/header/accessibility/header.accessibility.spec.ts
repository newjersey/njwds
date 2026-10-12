import { runA11ySuite } from "../../../../utils/runA11ySuite";

const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-header--default&viewMode=story`,
  },
  {
    name: "extended",
    url: `/iframe.html?id=components-header--extended&viewMode=story`,
  },
  {
    name: "with language selector",
    url: `/iframe.html?id=components-header--with-language-selector&viewMode=story`,
  },
  {
    name: "with language selector above search",
    url: `/iframe.html?id=components-header--with-language-selector-above-search&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Header",
  include: ".usa-header",
  cases: TEST_CASES,
});

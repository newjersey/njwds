import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-table--default&viewMode=story`,
  },
  {
    name: "borderless",
    url: `/iframe.html?id=components-table--default&viewMode=story&args=border:false`,
  },
  {
    name: "compact",
    url: `/iframe.html?id=components-table--compact&viewMode=story`,
  },
  {
    name: "scrollable",
    url: `/iframe.html?id=components-table--scrollable&viewMode=story`,
  },
  {
    name: "sortable",
    url: `/iframe.html?id=components-table--sortable&viewMode=story`,
  },
  {
    name: "striped",
    url: `/iframe.html?id=components-table--striped&viewMode=story`,
  },
  {
    name: "responsive",
    url: `/iframe.html?id=components-table--responsive&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Table",
  include: ".usa-table",
  cases: TEST_CASES,
});

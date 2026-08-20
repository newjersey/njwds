import { runVisualSuite } from "../../../../utils/runVisualSuite";
import { DEFAULT_VIEWPORT, NARROW_VIEWPORT } from "../../../../utils/config";

// This component is tested over multiple viewports
const viewports = [
  { name: "narrow", ...NARROW_VIEWPORT },
  { name: "wide", ...DEFAULT_VIEWPORT },
];

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

runVisualSuite({
  suiteName: "Table",
  cases: TEST_CASES,
  viewport: viewports,
});

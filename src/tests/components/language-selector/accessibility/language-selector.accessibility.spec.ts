import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-language-selector--simple-toggle&viewMode=story`,
  },
  {
    name: "dropdown",
    url: `/iframe.html?id=components-language-selector--dropdown-menu&viewMode=story`,
  },
];

runA11ySuite({
  suiteName: "Language selector",
  include: ".usa-language-container",
  cases: TEST_CASES,
});

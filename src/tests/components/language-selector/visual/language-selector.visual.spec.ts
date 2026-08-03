import { runVisualSuite } from "../../../../utils/runVisualSuite";

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

runVisualSuite({
  suiteName: "Language selector",
  cases: TEST_CASES,
});

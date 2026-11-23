import { runVisualSuite } from "../../../../utils/runVisualSuite";

const TEST_CASES = [
{{cssOnlyCase}}  {
    name: "Default (Web Component)",
    url: `/iframe.html?id=web-components-{{name}}--default&viewMode=story`,
  },
  {
    name: "Default (React)",
    url: `/iframe.html?id=react-components-{{name}}--default&viewMode=story`,
  },
];

runVisualSuite({
  suiteName: "{{Title}}",
  cases: TEST_CASES,
});

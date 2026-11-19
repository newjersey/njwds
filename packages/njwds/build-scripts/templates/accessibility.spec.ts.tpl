import { runA11ySuite } from "../../../../utils/runA11ySuite";

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

// #storybook-root, not #root-inner: the React story returns a DOM node, so Storybook
// doesn't create #root-inner for it and axe would throw "No elements found for include"
runA11ySuite({
  suiteName: "{{Title}}",
  include: "#storybook-root",
  cases: TEST_CASES,
});

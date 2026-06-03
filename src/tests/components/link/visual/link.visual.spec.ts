import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "light",
    url: `/iframe.html?id=components-link--default&viewMode=story&globals=&args=theme%3Alight%3Bexternal%3A!true`,
  },
  {
    name: "dark",
    url: `/iframe.html?id=components-link--default&viewMode=story&globals=&args=theme%3Adark%3Bexternal%3A!true`,
  },
];

runVisualSuite({
  suiteName: "Link",
  cases: TEST_CASES,
});

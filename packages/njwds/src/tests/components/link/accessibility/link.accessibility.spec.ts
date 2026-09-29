import { runA11ySuite } from "../../../../utils/runA11ySuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "light",
    url: `/iframe.html?id=components-link--default&viewMode=story&globals=&args=mode%3Alight%3Bexternal%3A!true`,
  },
  {
    name: "dark",
    url: `/iframe.html?id=components-link--default&viewMode=story&globals=&args=mode%3Adark%3Bexternal%3A!true`,
  },
];

runA11ySuite({
  suiteName: "Link",
  include: ".usa-link",
  cases: TEST_CASES,
});

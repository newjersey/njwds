import { runVisualSuite } from "../../../../utils/runVisualSuite";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "Default",
    url: `/iframe.html?id=components-icon--default&viewMode=story`,
  },
  {
    name: "Size 1",
    url: `/iframe.html?id=components-icon--default&viewMode=story&args=size:1`,
  },
  {
    name: "Size 5",
    url: `/iframe.html?id=components-icon--default&viewMode=story&args=size:5`,
  },
  {
    name: "Size 9",
    url: `/iframe.html?id=components-icon--default&viewMode=story&args=size:9`,
  },
];

runVisualSuite({
  suiteName: "Icon",
  cases: TEST_CASES,
});

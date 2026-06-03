import { runVisualSuite } from "../../../utils/runVisualSuite";
import { DEFAULT_VIEWPORT, NARROW_VIEWPORT } from "../../../utils/config";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `/iframe.html?id=components-banner--default&viewMode=story`,
  },
];

// This component is tested over multiple viewports to ensure it is responsive and accessible on all devices.
const viewports = [
  { name: "narrow", ...NARROW_VIEWPORT },
  { name: "wide", ...DEFAULT_VIEWPORT },
];

// Run the tests
runVisualSuite({
  suiteName: "Banner",
  cases: TEST_CASES,
  viewport: viewports,
});

import { runVisualSuite } from "../utils/runVisualSuite";
import { DEFAULT_VIEWPORT, NARROW_VIEWPORT } from "../utils/config";

const BASE_URL = "http://localhost:6006";

// Define all the story URLs and friendly names for reporting
const TEST_CASES = [
  {
    name: "default",
    url: `${BASE_URL}/iframe.html?id=components-banner--basic&viewMode=story`,
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

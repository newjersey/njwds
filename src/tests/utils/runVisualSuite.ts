import { test, expect } from "@playwright/test";

export interface VisualTestCase {
  /** Friendly name used in test reporting */
  name: string;

  /** Fully qualified URL */
  url: string;
}

// Options for generating a visual test suite.
interface RunVisualSuiteOptions {
  // Top-level suite name used in test reporting.
  suiteName: string;

  // List of scenarios to run
  cases: VisualTestCase[];
}

// Generates a fully configured Playwright visual test suite.
export function runVisualSuite({ suiteName, cases }: RunVisualSuiteOptions) {
  test.describe(suiteName, () => {
    for (const { name, url } of cases) {
      // Each scenario is its own parallel group.
      test.describe.parallel(name, () => {
        test(`renders correctly (${name})`, async ({ page }) => {
          // Stabilize rendering:
          await page.emulateMedia({ reducedMotion: "reduce" });

          // Navigate directly to the Storybook iframe URL
          await page.goto(url);

          // Wait for network to chill.
          await page.waitForLoadState("networkidle");

          // Full-page screenshot
          await expect(page).toHaveScreenshot(`${suiteName}-${name}.png`, {
            fullPage: true,
            maxDiffPixelRatio: 0.01, // allow a 1% difference for wiggles
          });
        });
      }); // test.describe.parallel
    } // for
  }); // test.describe
} // export function

import { test, expect } from "@playwright/test";
import { DEFAULT_VIEWPORT } from "../utils/config";

export interface VisualTestCase {
  /** Friendly name used in test reporting */
  name: string;

  /** Fully qualified URL */
  url: string;
}

export interface Viewport {
  name: string;
  width: number;
  height: number;
}

// Options for generating a visual test suite.
interface RunVisualSuiteOptions {
  suiteName: string;
  cases: VisualTestCase[];
  viewport?: Viewport[];
}

// Generates a fully configured Playwright visual test suite.
export function runVisualSuite({ suiteName, cases, viewport }: RunVisualSuiteOptions) {
  test.describe(suiteName, () => {
    for (const { name, url } of cases) {
      // If viewports exist → run matrix, otherwise run once
      const viewportsToRun =
        viewport && viewport.length > 0
          ? viewport
          : [
              {
                name: "default",
                ...DEFAULT_VIEWPORT,
              },
            ];

      test.describe.parallel(name, () => {
        for (const vp of viewportsToRun) {
          test(`renders correctly (${name} • ${vp.name})`, async ({ page }) => {
            // Stabilize rendering
            await page.emulateMedia({ reducedMotion: "reduce" });

            // Apply viewport (only matters if user passed them)
            await page.setViewportSize({
              width: vp.width,
              height: vp.height,
            });

            await page.goto(url);
            await page.waitForLoadState("networkidle");

            await expect(page).toHaveScreenshot(`${suiteName}-${name}-${vp.name}.png`, {
              fullPage: true,
              maxDiffPixelRatio: 0.05,
            });
          });
        }
      });
    }
  });
}

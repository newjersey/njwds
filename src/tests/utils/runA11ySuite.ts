/**
 * Shared Playwright utility for generating consistent accessibility test suites.
 *
 * USAGE EXAMPLE
 * -------------
 * runA11ySuite({
 *   suiteName: "Link component",
 *   include: ".usa-link",
 *   cases: [
 *     { name: "light", url: "..." },
 *     { name: "dark", url: "..." }
 *   ]
 * });
 */

import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

export interface A11yTestCase {
  /** Friendly name used in test reporting */
  name: string;

  /** Fully qualified URL (usually Storybook iframe) */
  url: string;
}

// Options for generating an accessibility test suite.
interface RunA11ySuiteOptions {
  // Top-level suite name used in test reporting.
  suiteName: string;

  // List of scenarios to run
  cases: A11yTestCase[];

  // Optional CSS selector to scope the axe scan.
  include?: string;
}

// Generates a fully configured Playwright accessibility suite.
export function runA11ySuite({ suiteName, cases, include }: RunA11ySuiteOptions) {
  test.describe(suiteName, () => {
    for (const { name, url } of cases) {
      // Each scenario is its own parallel group.
      test.describe.parallel(name, () => {
        test("has no detectable a11y violations", async ({ page }) => {
          // Navigate directly to the Storybook iframe URL
          await page.goto(url);

          // Wait for network to chill.
          await page.waitForLoadState("networkidle");

          // Initialize axe with the current page context
          const builder = new AxeBuilder({ page });

          // Scope the scan if a selector is provided.
          if (include) builder.include(include);

          // Execute the accessibility analysis
          const results = await builder.analyze();

          // Assert zero violations to keep the rule strict.
          expect(results.violations).toEqual([]);
        });
      }); // test.describe.parallel
    } // for
  }); // test.describe
} // export function

import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

// Resolve __dirname in ESM
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  resolve: {
    alias: {
      // If you need to alias Lit or other packages, do it here
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Silences Dart Sass deprecation warnings from dependencies
        quietDeps: true,
      },
    },
  },
  build: {
    // Optional: customize build output for Lit
    target: "esnext",
    minify: false,
  },
  optimizeDeps: {
    // Add Lit or other dependencies here if Vite fails to pre-bundle them
    include: ["lit", "lit/decorators.js"],
  },
  // Note: build-scripts/ has its own vitest.config.ts for Node environment
  // Note: Playwright tests (visual/accessibility) are run via separate commands
  test: {
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: ["src/**/*.ts"],
      exclude: ["src/**/*.stories.ts", "src/tests/**"],
      thresholds: {
        statements: 80,
        branches: 80,
        functions: 80,
        lines: 80,
      },
    },
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          globals: true,
          environment: "jsdom",
          setupFiles: ["vitest.setup.ts"],
          // Exclude Playwright tests from Vitest
          exclude: [
            "**/node_modules/**",
            "**/.superpowers/**",
            "**/.claude/**",
            "**/dist/**",
            "**/.{idea,git,cache,output,temp}/**",
            "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
            "**/src/tests/**/*.visual.spec.ts", // Exclude Playwright visual tests
            "**/src/tests/**/*.accessibility.spec.ts", // Exclude Playwright accessibility tests
          ],
        },
      },
      {
        extends: true,
        plugins: [storybookTest({ configDir: path.join(__dirname, ".storybook") })],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});

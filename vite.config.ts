import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
  // Vitest configuration (unit tests only)
  // Note: build-scripts/ has its own vitest.config.ts for Node environment
  // Note: Playwright tests (visual/accessibility) are run via separate commands
  // @ts-expect-error - Vitest extends Vite's config, types don't reflect this
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"],
    // Exclude Playwright tests from Vitest
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/.{idea,git,cache,output,temp}/**",
      "**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*",
      "**/src/tests/**/*.visual.spec.ts", // Exclude Playwright visual tests
      "**/src/tests/**/*.accessibility.spec.ts", // Exclude Playwright accessibility tests
    ],
  },
});

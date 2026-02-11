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
  // Vitest can pick up this config automatically
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["vitest.setup.ts"], // points to your Storybook setup
  },
});

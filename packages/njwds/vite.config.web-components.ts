import { defineConfig } from "vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { readdirSync } from "node:fs";
import { scssLoadPaths } from "./build-scripts/scss-load-paths.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const componentsDir = path.resolve(__dirname, "src/components");

const componentEntries = Object.fromEntries(
  readdirSync(componentsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => [entry.name, path.resolve(componentsDir, entry.name, "index.ts")]),
);

export default defineConfig({
  build: {
    outDir: "dist/components",
    emptyOutDir: false,
    sourcemap: true,
    lib: {
      entry: {
        index: path.resolve(componentsDir, "index.ts"),
        ...componentEntries,
      },
      formats: ["es"],
    },
    rollupOptions: {
      external: [/^lit/],
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        loadPaths: scssLoadPaths,
      },
    },
  },
});

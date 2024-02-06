import { defineConfig } from "vite";

export default defineConfig({
  root: "./src",
  build: {
    outDir: "../e2e",
    assetsDir: "",
    rollupOptions: {
      input: "./main.e2e.ts",
      output: {
        entryFileNames: "code.js",
      },
      treeshake: false,
    },
    minify: false,
    target: "es2020",
  },
});

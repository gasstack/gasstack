import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    nodePolyfills({ include: ["fs", "path"] }),
    dts({ rollupTypes: true }),
  ],
  build: {
    lib: {
      entry: "./index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["rollup", "fs", "path"],
    },
  },
});

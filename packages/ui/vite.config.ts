import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ rollupTypes: true })],
  build: {
    lib: {
      entry: "./index.ts",
      fileName: "index",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["rollup"],
    },
  },
});

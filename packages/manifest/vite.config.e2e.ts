import { defineConfig } from "vite";
import { manifestPligin } from "./src/rollup-plugin";
import { defineManifest } from "./src/core";
import { test_home } from "./main.e2e";

const fn = (e: any) => [];
const manifest = defineManifest((builder) =>
  builder
    .withScopes((p) => p.withTriggerManagement())
    .withAddOn("Test", "https://logo.org", test_home, (b) =>
      b
        .forCalendar((t) => t.withCurrentEventAccess("READ_WRITE"), test_home)
        .forDrive(fn, (e) => test_home(e))
        .forDocs(null, fn)
    )
);

export default defineConfig({
  root: "./src",
  plugins: [manifestPligin({ manifest: manifest })],
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

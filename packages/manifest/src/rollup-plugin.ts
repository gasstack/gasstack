import { Plugin } from "vite";
import { ManifestResource } from "./types";
import { readFileSync } from "fs";
import { join, resolve } from "path";

export type ChangeManifestOptions = {
  claspJsonPath?: string;
  manifest: ManifestResource;
};

const appsscriptConfigFile = "appsscript.json";

/**
 * Plugin function to control the appsscript manifest generation and update.
 * @param options Object containing the ManifestResource definition and the ".clasp.json" file path (default: ./).
 * @returns Rollup/Vite plugin
 */
export function manifestPligin(options: ChangeManifestOptions): Plugin {
  options.claspJsonPath = options.claspJsonPath ?? "./.clasp.json";
  const state: {
    rootDir: string;
    manifest: ManifestResource;
  } = {
    rootDir: "./",
    manifest: null,
  };
  return {
    name: "@gasstack/manifest",
    async buildStart() {
      const claspJson = JSON.parse(
        readFileSync(options.claspJsonPath).toString("utf-8")
      );

      state.rootDir = resolve(claspJson.rootDir ?? "./");
      state.manifest = JSON.parse(
        readFileSync(join(state.rootDir, appsscriptConfigFile)).toString(
          "utf-8"
        )
      );
    },
    async generateBundle() {
      state.manifest = { ...state.manifest, ...options.manifest };

      this.emitFile({
        type: "asset",
        fileName: appsscriptConfigFile,
        source: JSON.stringify(state.manifest, null, 2),
      });
    },
  };
}

# @gasstack/manifest

The package is meant to ease and automate the process of creating a Google App Script manifest file, expecially the options regarding addons.

## Description

The package provide a fluent based api to configure a manifest file, managing entangled options such as function names, necessary oauth scopes and url whitelisting both for UrlFetch and OpenLink scenarios.

The package contains also a [Rollup](https://rollupjs.org/) / [Vite](https://vitejs.dev/) compatible plugin, which serach for the **.clasp.json** configuration file and rewrites the **appsscript.json** manifest file according to the fluent configuration.

## Usage

Export a constant created with the fluent manifest configuration:

```ts
export const CONFIG = defineManifest((builder) =>
  builder
    .withScopes((p) => p.withTriggerManagement())
    .withAddOn("Test", "https://logo.org", test_home, (b) =>
      b.forCalendar((t) => t.withCurrentEventAccess("READ_WRITE")).forDrive()
    )
);
```

Configure Vite or Rollup withthe given plugin:

```ts
import { defineConfig } from "vite";
import { manifestPligin } from "@gasstack/manifest";
import { CONFIG } from "./index";

export default defineConfig({
  root: "./src",
  plugins: [manifestPligin({ manifest: manifest })],
});
```

## Example

Have a look to the [e2e test](main.e2e.ts).

## API

[API Reference](docs/modules.md)

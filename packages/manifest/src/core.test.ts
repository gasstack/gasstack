import { test, describe, expect } from "vitest";
import { defineManifest } from "./core";

function test_home(e: GoogleAppsScript.Addons.EventObject) {
  return [CardService.newCardBuilder().build()];
}

describe("Manifest production", () => {
  test("basic creation", () => {
    const result = defineManifest((builder) =>
      builder
        .withExecutionApi("ANYONE")
        .withSheetsMacro((p) =>
          p.add("test", () => console.log("hi"), 1).add("Test 2", () => {}, 2)
        )
        .withWebApp("ANYONE", "USER_ACCESSING")
        .withScopes((p) => p.withTriggerManagement().withUrlFetch())
        .withAddOn("Test", "https://image.org", test_home, (p) =>
          p.forGmail().theme("#ff0000")
        )
    );

    console.log(JSON.stringify(result));
  });
});

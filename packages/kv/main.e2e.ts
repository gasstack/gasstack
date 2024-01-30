import { KVStore, createSpreadsheetStore } from "./index";

const assertResults: [boolean, string][] = [];
function assert(exp: boolean, msg?: string) {
  assertResults.push([exp, msg]);
}
function assertEq(actual: any, expected: any) {
  assertResults.push([
    actual == expected,
    actual == expected ? undefined : `expected ${expected}, received ${actual}`,
  ]);
}
function assertThrows(fn: () => void) {
  try {
    fn();
    assertResults.push([false, "Expected exception not thrown"]);
  } catch {
    assertResults.push([true, undefined]);
  }
}

function clearTestResults() {
  assertResults.splice(0, assertResults.length);
}

function showTestResults() {
  console.log(`Total asserts: ${assertResults.length}`);
  console.log(`${assertResults.filter(([p]) => p).length} passed`);
  if (!!assertResults.find(([p]) => !p)) {
    console.log(`${assertResults.filter(([p]) => !p).length} failed`);
    console.log(
      assertResults.reduce(
        (acc, [p, m], i) => (!p ? `${acc}\n${i + 1}: ${m ?? ""}` : acc),
        ""
      )
    );
  }
}

function doTest(name: string, fn: () => void) {
  clearTestResults();
  console.log(`Test: ${name}`);
  fn();
  showTestResults();
}

function _test_suite(store: KVStore) {
  store.clear();
  console.log("Range cleared");

  assertEq(Object.keys(store.entries()).length, 0);

  store.set("prova_txt", "ciao");
  store.set("prova_num", 3);
  store.set("prova_obj", { k: "uno", v: 1 });

  assertEq(Object.keys(store.entries()).length, 3);
  assertEq(store.entries()["prova_txt"], "ciao");
  assertEq(store.entries()["prova_num"], 3);
  assertEq(store.entries()["prova_obj"]["k"], "uno");

  store.set("prova_num", "test");

  assertEq(Object.keys(store.entries()).length, 3);
  assertEq(store.entries()["prova_txt"], "ciao");
  assertEq(store.entries()["prova_num"], "test");
  assertEq(store.entries()["prova_obj"]["k"], "uno");

  store.delete("prova_num");

  assertEq(Object.keys(store.entries()).length, 2);
  assertEq(store.entries()["prova_txt"], "ciao");
  assertEq(store.entries()["prova_obj"]["k"], "uno");

  assertEq(store.has("prova_num"), false);
  assertEq(store.has("prova_txt"), true);
}

function _test() {
  const SPREADSHEET_ID = null;

  const ss = !SPREADSHEET_ID
    ? SpreadsheetApp.getActive()
    : SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheet_store = createSpreadsheetStore(ss.getRange("ranges!A5:B5"));

  doTest("spreadsheet", () => _test_suite(sheet_store));
}

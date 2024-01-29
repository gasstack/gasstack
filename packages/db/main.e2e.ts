import {
  ContextRef,
  add,
  boolean,
  commit,
  count,
  createContext,
  createManagedContext,
  createManagedContextGroup,
  deleteAt,
  formula,
  insertAt,
  hyperLink,
  list,
  numeric,
  read,
  remove,
  rollback,
  seqReset,
  serial,
  text,
  updateAt,
} from ".";

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

function _test_suite(ctx: ContextRef<typeof mapping>) {
  deleteAt(ctx, 0, count(ctx));
  seqReset(ctx, "seq", 0);
  console.log("Range cleared");

  assertEq(count(ctx), 0);
  assertEq(read(ctx).length, 0);

  let inserted = insertAt(
    ctx,
    [
      {
        id: 0,
        name: "zero",
        score: false,
        link: { url: "https://www.google.com", label: "Page 1" },
      },
      {
        id: 1,
        name: "one",
        score: true,
        link: { url: "https://www.google.com", label: "Page 2" },
      },
      {
        id: 2,
        name: "two",
        score: true,
        link: { url: "https://www.google.com", label: "Page 3" },
      },
    ],
    0
  );

  assertEq(count(ctx), 3);
  assertEq(read(ctx).length, 3);
  assertEq(read(ctx)[0].id, 0);
  assertEq(read(ctx)[0].fseq, read(ctx)[0].seq * 2);
  assertEq(read(ctx)[0].seq, 1);
  assertEq(read(ctx)[2].seq, 3);
  assertEq(read(ctx)[0].seq, inserted[0].seq);
  assertEq(read(ctx)[2].seq, inserted[2].seq);

  insertAt(
    ctx,
    {
      id: 4,
      name: "four",
      score: false,
      link: { url: "https://www.google.com", label: "Page 4" },
    },
    0
  );

  assertEq(count(ctx), 4);
  assertEq(read(ctx)[0].id, 4);

  insertAt(
    ctx,
    {
      id: 5,
      name: "five",
      score: true,
      link: { url: "https://www.google.com", label: "Page 5" },
    },
    1
  );

  assertEq(count(ctx), 5);
  assertEq(read(ctx)[0].id, 4);
  assertEq(read(ctx)[1].id, 5);
  assertEq(read(ctx)[2].id, 0);

  insertAt(
    ctx,
    [
      {
        id: 0,
        name: "zero",
        score: false,
        link: { url: "https://www.google.com", label: "Page 6" },
      },
      {
        id: 1,
        name: "one",
        score: true,
        link: { url: "https://www.google.com", label: "Page 7" },
      },
      {
        id: 2,
        name: "two",
        score: false,
        link: { url: "https://www.google.com", label: "Page 8" },
      },
    ],
    0
  );

  assertEq(count(ctx), 8);
  assertEq(read(ctx).length, 8);
  assertEq(read(ctx)[0].id, 0);
  assertEq(read(ctx)[3].id, 4);

  deleteAt(ctx, 0);

  assertEq(count(ctx), 7);
  assertEq(read(ctx).length, 7);
  assertEq(read(ctx)[0].id, 1);

  deleteAt(ctx, 1);

  assertEq(count(ctx), 6);
  assertEq(read(ctx).length, 6);
  assertEq(read(ctx)[0].id, 1);
  assertEq(read(ctx)[1].id, 4);

  updateAt(ctx, { id: 10 }, 0);

  assertEq(count(ctx), 6);
  assertEq(read(ctx).length, 6);
  assertEq(read(ctx)[0].id, 10);
  assertEq(read(ctx)[1].id, 4);

  updateAt(ctx, [{ id: 20 }, { id: 21 }], 0);

  assertEq(count(ctx), 6);
  assertEq(read(ctx).length, 6);
  assertEq(read(ctx)[0].id, 20);
  assertEq(read(ctx)[1].id, 21);

  insertAt(
    ctx,
    [
      {
        id: 0,
        name: "zero",
        score: false,
        link: { url: "https://www.google.com", label: "Page 9" },
      },
      {
        id: 1,
        name: "one",
        score: true,
        link: { url: "https://www.google.com", label: "Page 10" },
      },
      {
        id: 2,
        name: "two",
        score: true,
        link: { url: "https://www.google.com", label: "Page 11" },
      },
    ],
    count(ctx) - 1,
    true
  );

  assertEq(count(ctx), 9);
  assertEq(read(ctx).length, 9);
  assertEq(read(ctx)[count(ctx) - 2].id, 1);
  assertEq(read(ctx)[count(ctx) - 1].id, 2);
}

function _test_suite_managed(ctx: ContextRef<typeof mapping>) {
  const orm = createManagedContext(ctx);

  let total = count(ctx);

  assertEq(count(ctx), total);
  assertEq(read(ctx).length, total);

  let added = add(orm, {
    id: 10,
    name: "zero",
    score: false,
    link: { url: "https://www.google.com", label: "Page 12" },
  });
  let items = list(orm);

  assertEq(count(ctx), total);
  assertEq(read(ctx).length, total);
  assertEq(items.length, total + 1);

  let first = read(ctx)[0];
  assertEq(items[0].id, first.id);

  items[0].id = 12;
  added.name = "added";

  commit(orm);
  assertEq(count(ctx), total + 1);
  assertEq(read(ctx).length, total + 1);
  assertEq(read(ctx)[0].id, 12);
  assertEq(items[0].id, 12);
  assertEq(read(ctx)[total].name, "added");

  total = count(ctx);

  assertEq(count(ctx), total);
  assertEq(read(ctx).length, total);

  added = add(orm, {
    id: 10,
    name: "zero",
    score: true,
    link: { url: "https://www.google.com", label: "Page 13" },
  });
  items = list(orm);

  assertEq(count(ctx), total);
  assertEq(read(ctx).length, total);
  assertEq(items.length, total + 1);

  first = read(ctx)[0];
  assertEq(items[0].id, first.id);

  items[0].id = 13;
  added.name = "added +";

  rollback(orm);
  assertEq(count(ctx), total);
  assertEq(read(ctx).length, total);
  assertEq(read(ctx)[0].id, first.id);
  assertThrows(() => {
    added.name = "test";
  });

  first = read(ctx)[0];
  added = add(
    orm,
    {
      id: 100,
      name: "test",
      score: true,
      link: { url: "https://www.google.com", label: "Page 14" },
    },
    0
  );

  assertEq(list(orm)[0].id, 100);
  assertEq(list(orm)[1].id, first.id);

  remove(orm, added);

  assertEq(list(orm)[0].id, first.id);

  added = add(
    orm,
    {
      id: 200,
      name: "test",
      score: true,
      link: { url: "https://www.google.com", label: "Page 15" },
    },
    0
  );

  assertEq(list(orm)[0].id, 200);
  assertEq(list(orm)[1].id, first.id);

  rollback(orm);

  assertEq(list(orm)[0].id, first.id);

  first = read(ctx)[0];
  added = add(
    orm,
    {
      id: 100,
      name: "test",
      score: true,
      link: { url: "https://www.google.com", label: "Page 16" },
    },
    0
  );

  assertEq(list(orm)[0].id, 100);
  assertEq(list(orm)[1].id, first.id);

  remove(orm, added);

  assertEq(list(orm)[0].id, first.id);

  added = add(
    orm,
    {
      id: 200,
      name: "test",
      score: true,
      link: { url: "https://www.google.com", label: "Page 17" },
    },
    0
  );

  assertEq(list(orm)[0].id, 200);
  assertEq(list(orm)[1].id, first.id);

  commit(orm);

  assertEq(read(ctx)[0].id, 200);
  assertEq(read(ctx)[1].id, first.id);
  assertEq(count(ctx), total + 1);
}

const mapping = {
  id: numeric("Num"),
  name: text(1),
  seq: serial(numeric(2)),
  fseq: formula(numeric(3)),
  score: boolean("Rank"),
  link: hyperLink("Link"),
};

function _test() {
  const SPREADSHEET_ID = null;

  const ss = !SPREADSHEET_ID
    ? SpreadsheetApp.getActive()
    : SpreadsheetApp.openById(SPREADSHEET_ID);

  const table_context = createContext<typeof mapping>(
    ss,
    { sheetName: "table" },
    mapping
  );
  const named_range_context = createContext<typeof mapping>(
    ss,
    { rangeName: "table" },
    mapping
  );
  const a1_range_context = createContext<typeof mapping>(
    ss,
    { a1NotationRange: "ranges!O5:T5" },
    mapping
  );

  doTest("table", () => _test_suite(table_context));
  doTest("table managed", () => _test_suite_managed(table_context));
  doTest("named", () => _test_suite(named_range_context));
  doTest("named managed", () => _test_suite_managed(named_range_context));
  doTest("a1", () => _test_suite(a1_range_context));
  doTest("a1 managed", () => _test_suite_managed(a1_range_context));

  createManagedContextGroup(
    createManagedContext(table_context),
    createManagedContext(a1_range_context)
  );
}

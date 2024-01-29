import { describe, test, expect } from "vitest";
import { entityFromRow, RangeHeaders, rowFromEntity, RowObject } from "./core";
import { ColumnsMapping, hyperLink, numeric, serial, text } from "./schema";

describe("Row mapping", () => {
  test("Row from entity", () => {
    const mapping: ColumnsMapping = {
      id: numeric("Num"),
      name: text(1),
      score: numeric("Rank"),
      lnk: hyperLink(3),
      serial: serial(numeric(5)),
    };

    const headers: RangeHeaders = {
      Num: 0,
      Rank: 4,
    };

    const entity = {
      id: 3,
      name: "test",
      score: 1234,
      lnk: { url: "http://ciao", label: "ciao" },
      serial: 1,
    } satisfies RowObject<typeof mapping>;

    const row = rowFromEntity<typeof mapping>(entity, mapping, headers);

    expect(row).toEqual([
      3,
      "test",
      null,
      `=HYPERLINK("http://ciao","ciao")`,
      1234,
      1,
    ]);
  });

  test("Entity from row", () => {
    const mapping: ColumnsMapping = {
      id: numeric("Num"),
      name: text(1),
      score: numeric("Rank"),
      lnk: hyperLink(3),
      serial: serial(numeric(5)),
    };

    const headers: RangeHeaders = {
      Num: 0,
      Rank: 4,
    };

    const entity = entityFromRow<typeof mapping>(
      [3, "test", null, `=HYPERLINK("http://ciao", "ciao")`, 1234, 1],
      mapping,
      headers
    );

    expect(entity).toEqual({
      id: 3,
      name: "test",
      score: 1234,
      lnk: { url: "http://ciao", label: "ciao" },
      serial: 1,
    });
  });
});

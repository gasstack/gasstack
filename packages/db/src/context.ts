import {
  NewRowObject,
  RowObject,
  UpdateRowObject,
  entityFromRow,
  rowFromEntity,
} from "./core";
import {
  ColumnDef,
  ColumnValueType,
  ColumnsMapping,
  PropOfVariantNames,
  ReadOnlyColumnDef,
  SerialColumnDef,
} from "./schema";
import { seqNext } from "./sequences";
import {
  Context,
  createObjectRef,
  getColumnIndex,
  getDataRange,
  getFormulas,
  getHeaders,
  getObject,
  hasFormulaColumns,
  offsetFormulas,
  shouldHaveHeaders,
  trimIndex,
} from "./utils";

export type DataRangeDescriptor =
  | { sheetName: string }
  | { rangeName: string }
  | { a1NotationRange: string };

export type ContextMetadataStore = {
  get(key: string): string | null;
  set(key: string, value: string): void;
};

export type ContextRef<T extends ColumnsMapping> = {
  [Symbol.dispose]: () => void;
  __brand: "ContextRef<T>";
};

/**
 * Creates a table mapped context given a spreadsheet and a range in it. If the schema definition contains string mappings,
 * the first row is used as an header row. If the schema contains formula mapping, the row below the header (if present)
 * is used to read the expected formulas and copy them on te future added rows.
 * @param spreadsheet Google Spreadsheet to use
 * @param range Range of the table. Could be an entire sheet, a named range or an A1Notation range.
 * @param columns Schema definition of the mapped table.
 * @param metadata Context metadata store, used for internal operations (eg.: sequences, indexes). Defaults to a ScriptProperties.
 * @returns Disposable reference of a typed Context handle.
 */
export function createContext<T extends ColumnsMapping>(
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet,
  range: DataRangeDescriptor,
  columns: ColumnsMapping,
  metadata?: ContextMetadataStore
): ContextRef<T> {
  const withHeaders = shouldHaveHeaders(columns);
  const withFormulas = hasFormulaColumns(columns);

  const dataRange = getDataRange(spreadsheet, range);

  const offsetTop = (withHeaders ? 1 : 0) + (withFormulas ? 1 : 0);
  const headers = withHeaders ? getHeaders(dataRange) : null;
  const formulas = withFormulas ? getFormulas(dataRange) : null;
  const formulaIdxes = formulas
    ?.map((p, i) => (p != "" ? i : null))
    .filter((p) => p != null);

  let rowCount = dataRange.getNumRows() - offsetTop;

  if (rowCount == 1) {
    const firstRow = dataRange.offset(offsetTop, 0, 1).getValues()[0];
    rowCount = !!firstRow.find((p) => p != "") ? rowCount : 0;
  }

  const serialNames = Object.keys(columns).filter(
    (key) => !!(columns[key] as SerialColumnDef<any>)?.serial
  ) as PropOfVariantNames<T, SerialColumnDef<any>>[];

  const serials: number[] = Object.keys(columns)
    .filter((key) => !!(columns[key] as SerialColumnDef<any>)?.serial)
    .map((key) => getColumnIndex(columns[key], headers));

  const checkboxes: number[] = Object.keys(columns)
    .filter((key) => columns[key].type === "boolean")
    .map((key) => getColumnIndex(columns[key], headers));

  const links: number[] = Object.keys(columns)
    .filter((key) => columns[key].type === "link")
    .map((key) => getColumnIndex(columns[key], headers));

  const readonlys: number[] = Object.keys(columns)
    .filter((key) => !!(columns[key] as ReadOnlyColumnDef<any>)?.readonly)
    .map((key) => getColumnIndex(columns[key], headers));

  const generateds: number[] = Object.keys(columns)
    .filter((key) => !!(columns[key] as ColumnDef<any>)?.generated)
    .map((key) => getColumnIndex(columns[key], headers));

  if (!metadata) {
    const prop =
      PropertiesService.getDocumentProperties() ??
      PropertiesService.getScriptProperties();
    metadata = {
      get(key: string): string | null {
        return prop.getProperty(key);
      },
      set(key: string, value: string) {
        prop.setProperty(key, value);
      },
    };
  }

  const ctx: Context<T> = {
    spreadsheet: spreadsheet,
    rangeDef: range,
    columnsDef: columns,
    rowCount: rowCount,
    headers: headers,
    dataRange: dataRange,
    offsetTop: offsetTop,
    metadata: metadata,
    serialNames: serialNames,
    serialIdxes: serials,
    generatedIdxes: generateds,
    checkboxeIdxes: checkboxes,
    linkIdxes: links,
    formulas: formulas,
    readonlyIdxes: readonlys,
    formulaIdxes: formulaIdxes,
  };

  return createObjectRef(ctx) as ContextRef<T>;
}

/**
 * Reads the mapped table.
 * @param ctx Context reference
 * @param offset Number of rows to skip
 * @param limit Number of rows to return.
 * @returns Array of mapped row objects.
 */
export function read<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  offset: number = 0,
  limit?: number
): RowObject<T>[] {
  const pctx: Context<T> = getObject(ctx);

  limit = limit ?? pctx.rowCount;

  const dataRange =
    limit > 0
      ? pctx.dataRange.offset(pctx.offsetTop + offset, 0, limit).getValues() ??
        []
      : [];

  if (pctx.linkIdxes.length > 0 && dataRange.length > 0) {
    pctx.linkIdxes.forEach((lnkIdx) => {
      const formulas = pctx.dataRange
        .offset(pctx.offsetTop + offset, lnkIdx, limit, 1)
        .getFormulas();

      dataRange.forEach((row, rIdx) => {
        row[lnkIdx] = formulas[rIdx][0];
      });
    });
  }

  return dataRange.map((row) =>
    entityFromRow(row, pctx.columnsDef, pctx.headers)
  );
}

/**
 * Returns the table size.
 * @param ctx Context reference.
 * @returns The number of rows of the table.
 */
export function count<T extends ColumnsMapping>(ctx: ContextRef<T>): number {
  const pctx: Context<T> = getObject(ctx);
  return pctx.rowCount;
}

/**
 * Ineserts item(s) in the table.
 * @param ctx Context reference
 * @param inserts Single mapped row object or an array of mapped row objects to be inserted.
 * @param index Start index of insertion.
 * @param append If true the insertion happen below the given index and not at the given index.
 * @returns Inserted row(s) with the computed or generated values correctly assigned.
 */
export function insertAt<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  inserts: NewRowObject<T> | NewRowObject<T>[],
  index: number,
  append?: boolean
) {
  const pctx: Context<T> = getObject(ctx);
  index = trimIndex(index, pctx.rowCount);

  const appendOffset = append ? 1 : 0;
  const items = Array.isArray(inserts) ? inserts : [inserts];

  const rows: ColumnValueType[][] = items.map((item) => {
    pctx.serialNames.map((key) => {
      const cDef = pctx.columnsDef[key as string] as SerialColumnDef<any>;
      (item as Record<keyof T, any>)[key] = !!cDef?.genFn
        ? cDef.genFn(seqNext(ctx, key))
        : seqNext(ctx, key);
    });
    return rowFromEntity<T>(
      item as any as Partial<RowObject<T>>,
      pctx.columnsDef,
      pctx.headers
    );
  });

  const position = pctx.offsetTop + index + appendOffset;

  const newRange = pctx.dataRange.offset(position, 0, 1);

  rows.forEach((row, rIdx) => {
    const formulas = offsetFormulas(
      pctx.formulas,
      position + rIdx - 1,
      pctx.linkIdxes
    );
    formulas.forEach((value, cIdx) => {
      if (value != "") row[cIdx] = value;
    });
  });

  newRange.offset(0, 0, rows.length).insertCells(SpreadsheetApp.Dimension.ROWS);
  rows.forEach((row, rIdx) => {
    row.forEach((value, cIdx) => {
      if (
        !pctx.readonlyIdxes.includes(cIdx) ||
        pctx.generatedIdxes.includes(cIdx)
      )
        newRange.offset(rIdx, cIdx, 1, 1).setValue(value);
    });
  });

  pctx.checkboxeIdxes.forEach((idx) => {
    newRange.offset(0, idx, rows.length, 1).insertCheckboxes();
  });

  pctx.rowCount += rows.length;

  return read(ctx, index + appendOffset, rows.length);
}

/**
 * Remove item(s) from the table.
 * @param ctx Context reference.
 * @param index Start index from which to remove.
 * @param count Number of items to be removed.
 * @returns
 */
export function deleteAt<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  index: number,
  count: number = 1
): void {
  const pctx: Context<T> = getObject(ctx);
  if (count <= 0) return;
  index = trimIndex(index, pctx.rowCount);
  const oldRange = pctx.dataRange.offset(index + pctx.offsetTop, 0, count);
  oldRange.deleteCells(SpreadsheetApp.Dimension.ROWS);
  pctx.rowCount -= count;
}

/**
 * Updates item(s) of a table.
 * @param ctx Context reference.
 * @param updates Single mapped row object or an array of mapped row objects to be updated.
 * @param index Start index of update.
 * @returns Updated row(s) with the computed or generated values correctly assigned.
 */
export function updateAt<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  updates: UpdateRowObject<T> | UpdateRowObject<T>[],
  index: number
) {
  const pctx: Context<T> = getObject(ctx);
  index = trimIndex(index, pctx.rowCount);

  const items = Array.isArray(updates) ? updates : [updates];
  items.forEach((item, rIdx) => {
    let row = rowFromEntity<T>(
      item as any as Partial<RowObject<T>>,
      pctx.columnsDef,
      pctx.headers
    );

    const newRange = pctx.dataRange.offset(index + pctx.offsetTop + rIdx, 0, 1);
    row.forEach((value, cIdx) => {
      if (value !== null && !pctx.readonlyIdxes.includes(cIdx))
        newRange.offset(0, cIdx, 1, 1).setValue(value);
    });
  });

  return read(ctx, index, items.length);
}

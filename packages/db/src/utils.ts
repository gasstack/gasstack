import { ContextMetadataStore, DataRangeDescriptor } from "./context";
import { RangeHeaders } from "./core";
import {
  ColumnsMapping,
  FormulaColumnDef,
  PropOfVariantNames,
  SerialColumnDef,
} from "./schema";

export function trimIndex(index: number, count: number) {
  if (!count) return 0;
  if (!index) return 0;

  return (count + (index % count)) % count;
}

export function getHeaders(
  dataRange: GoogleAppsScript.Spreadsheet.Range
): RangeHeaders {
  const headers = dataRange?.offset(0, 0, 1)?.getValues()[0];
  if (!headers) throw new Error("Missing header row");

  return headers.reduce(
    (acc, name, index) => ({
      ...acc,
      [name]: index,
    }),
    {}
  );
}

export function getFormulas(
  dataRange: GoogleAppsScript.Spreadsheet.Range
): string[] {
  const formulas = dataRange?.offset(1, 0, 1)?.getFormulas()[0];
  if (!formulas) throw new Error("Missing formulas row");

  return formulas;
}

export function offsetFormulas(
  formulas: string[],
  offset: number,
  skipIdx: number[]
): string[] {
  const newFormulas = [...formulas];
  newFormulas
    .map((value, idx) =>
      value != "" && !skipIdx.includes(idx) ? { value, idx } : null
    )
    .filter((p) => !!p)
    .forEach(({ value, idx }) => {
      Array.from(value.matchAll(/([A-Z]+)([0-9]+)/g)).map((m) => {
        value = value.replace(m[0], `${m[1]}${parseInt(m[2]) + offset}`);
      });

      newFormulas[idx] = value;
    });
  return newFormulas;
}

export function getDataRange(
  ss: GoogleAppsScript.Spreadsheet.Spreadsheet,
  params: DataRangeDescriptor,
  rowCount?: number
) {
  const range =
    "sheetName" in params
      ? ss.getSheetByName(params.sheetName)?.getDataRange() ?? null
      : "rangeName" in params
      ? ss
          .getRangeByName(params.rangeName)
          ?.getDataRegion(SpreadsheetApp.Dimension.ROWS) ?? null
      : "a1NotationRange" in params
      ? ss
          .getRange(params.a1NotationRange)
          ?.getDataRegion(SpreadsheetApp.Dimension.ROWS) ?? null
      : null;

  return rowCount !== undefined ? range?.offset(0, 0, rowCount) : range;
}

export function shouldHaveHeaders<T extends ColumnsMapping>(columns: T) {
  return (
    !!columns &&
    !!Object.keys(columns).find((k) => typeof columns[k].id === "string")
  );
}

export function hasFormulaColumns<T extends ColumnsMapping>(columns: T) {
  return (
    !!columns &&
    !!Object.keys(columns).find(
      (k) => !!(columns[k] as FormulaColumnDef<any>)?.formula
    )
  );
}

export type Context<T extends ColumnsMapping> = {
  spreadsheet: GoogleAppsScript.Spreadsheet.Spreadsheet;
  rangeDef: DataRangeDescriptor;
  columnsDef: ColumnsMapping;
  offsetTop: number;
  rowCount: number;
  dataRange: GoogleAppsScript.Spreadsheet.Range;
  headers: RangeHeaders | null;
  serialNames: PropOfVariantNames<T, SerialColumnDef<any>>[];
  serialIdxes: number[];
  generatedIdxes: number[];
  readonlyIdxes: number[];
  checkboxeIdxes: number[];
  linkIdxes: number[];
  metadata: ContextMetadataStore;
  formulas: string[];
  formulaIdxes: number[];
};

const objectStore: [any, any][] = [];

export function createObjectRef(obj: any): any {
  const ref = {};
  objectStore.push([ref, obj]);

  return ref;
}

export function getObject(ref: any): any {
  return objectStore.find(([r]) => r == ref)?.[1];
}

export function freeObjectRef(ref: any) {
  const idx = objectStore.findIndex(([r]) => r == ref);
  if (idx >= 0) objectStore.splice(idx, 1);
}

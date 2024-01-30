import { KVStore, KVStoreValue } from "./type";

function getValues(
  range: GoogleAppsScript.Spreadsheet.Range,
  rowCount: number
) {
  return range
    .offset(0, 0, rowCount)
    .getValues()
    .filter(([k, v]) => k != "");
}

/**
 * Creates a Key-Value store out of a Spreadsheet data range of two columns.
 * @param range Spreadsheet range of two columns.
 * @returns Generic Key-Value store.
 */
export const createSpreadsheetStore = (
  range: GoogleAppsScript.Spreadsheet.Range
): KVStore => {
  const dataRange = range.getDataRegion(SpreadsheetApp.Dimension.ROWS);
  let rowCount =
    dataRange.getNumRows() + (dataRange.getValues()[0]?.[0] ? 0 : -1);
  const store = {
    clear(): void {
      if (rowCount > 0) {
        dataRange
          .offset(0, 0, rowCount)
          .deleteCells(SpreadsheetApp.Dimension.ROWS);
      }
    },
    delete(key: string): void {
      const idx = getValues(dataRange, rowCount).findIndex(
        ([k, v]) => k == key
      );
      if (idx >= 0) {
        dataRange.offset(idx, 0, 1).deleteCells(SpreadsheetApp.Dimension.ROWS);
        rowCount--;
      }
    },
    get(key: string): KVStoreValue | undefined {
      const [, value] = getValues(dataRange, rowCount).find(
        ([k, v]) => k == key
      );
      return !value ? undefined : JSON.parse(value);
    },
    has(key: string): boolean {
      return (
        getValues(dataRange, rowCount).findIndex(([k, v]) => k == key) >= 0
      );
    },
    set(key: string, value: KVStoreValue): void {
      const idx = getValues(dataRange, rowCount).findIndex(
        ([k, v]) => k == key
      );
      let inserRange: GoogleAppsScript.Spreadsheet.Range;
      if (idx >= 0) {
        inserRange = dataRange.offset(idx, 0, 1);
      } else {
        inserRange = dataRange
          .offset(0, 0, 1)
          .insertCells(SpreadsheetApp.Dimension.ROWS);
        rowCount++;
      }
      inserRange.setValues([[key, JSON.stringify(value)]]);
    },
    entries(): { [key: string]: KVStoreValue } {
      return getValues(dataRange, rowCount).reduce((result, [k, v]) => {
        result[k] = JSON.parse(v);
        return result;
      }, {} as { [key: string]: KVStoreValue });
    },
  };

  return store;
};

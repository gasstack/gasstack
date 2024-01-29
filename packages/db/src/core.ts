import {
  ColumnDefVariant,
  ColumnValueType,
  ColumnsMapping,
  Link,
  PropOfVariantNames,
  ReadOnlyColumnDef,
} from "./schema";
import { getColumnIndex } from "./utils";

type ColumnDefValueType<
  K extends string | number | symbol,
  T extends Record<K, any>
> = T[K] extends ColumnDefVariant<infer V> ? V : never;

export type RowObject<T> = T extends ColumnsMapping
  ? {
      [K in keyof T]: ColumnDefValueType<K, T>;
    }
  : never;

export type NewRowObject<T> = T extends ColumnsMapping
  ? {
      [K in Exclude<
        keyof T,
        PropOfVariantNames<T, ReadOnlyColumnDef<any>>
      >]: ColumnDefValueType<K, T>;
    }
  : never;

export type UpdateRowObject<T> = T extends ColumnsMapping
  ? Partial<NewRowObject<T>>
  : never;

export type RangeHeaders = { [key: string]: number };

/**
 * Creates an object respecting the given T schema using the values from a row array.
 * @param row Array of values representing a table row.
 * @param columns Schema definition of the mapped table.
 * @param headers Headers row used to find the correct column indexes.
 * @returns Object of type T with the correct values.
 */
export function entityFromRow<T>(
  row: ColumnValueType[],
  columns: ColumnsMapping,
  headers: RangeHeaders = {}
): RowObject<T> {
  return Object.keys(columns).reduce((entity, prop) => {
    if (columns[prop] === null)
      throw new Error(`Missing mapping information for column '${prop}'`);

    const idx = getColumnIndex(columns[prop], headers);
    if (columns[prop].type == "link" && !!row[idx]) {
      const mc = (row[idx] as string).match(
        /=HYPERLINK\("([^,]*)"(\s*,\s*"(.*)")?\)/
      );
      entity[prop] = {
        url: mc[1].trim(),
        label: mc[3]?.trim(),
      };
    } else {
      entity[prop] = row[idx];
    }

    return entity;
  }, {}) as RowObject<T>;
}

/**
 *
 * @param entity Object satisfying the schema definition.
 * @param columns Schema definition of the mapped table.
 * @param headers Headers row used to find the correct column indexes.
 * @returns Creates a row array with values taken from an boject respecting the schema definition, positioned at the correct indexes.
 */
export function rowFromEntity<T>(
  entity: Partial<RowObject<T>>,
  columns: ColumnsMapping,
  headers: RangeHeaders = {}
): ColumnValueType[] {
  const sortedProps = Object.keys(entity)
    .map((prop) => {
      const id = columns[prop].id;
      return {
        prop,
        index: getColumnIndex(columns[prop], headers),
      };
    })
    .filter((p) => p.index !== undefined)
    .sort((a, b) => a.index! - b.index!);

  return sortedProps.reduce((row, sortedProp) => {
    while (row.length < sortedProp.index!) row.push(null);

    let value = (entity[sortedProp.prop] as ColumnValueType) ?? null;
    if (columns[sortedProp.prop].type == "link" && !!value) {
      const lnk = value as any as Link;
      value = `=HYPERLINK("${lnk.url}"${lnk.label ? `,"${lnk.label}"` : ""})`;
    }
    row.push(value);

    return row;
  }, [] as ColumnValueType[]);
}

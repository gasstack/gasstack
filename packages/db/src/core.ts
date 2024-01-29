import {
  ColumnDefKind,
  ColumnDefVariant,
  ColumnValueType,
  ColumnsMapping,
  Link,
  PkColumnDef,
  PropOfTypeNames,
  PropOfVariantNames,
  ReadOnlyColumnDef,
} from "./schema";

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

export function getColumnIndex(
  { type, id: colId }: ColumnDefKind,
  headers: RangeHeaders = {}
) {
  return typeof colId === "number"
    ? colId
    : typeof colId === "string"
    ? headers[colId]
    : headers["*"];
}

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

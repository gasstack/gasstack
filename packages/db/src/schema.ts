export type LinkAllowedSchema =
  | "http"
  | "https"
  | "mailto"
  | "aim"
  | "ftp"
  | "gopher"
  | "telnet"
  | "news";

export type Link = {
  url: `${LinkAllowedSchema}://${string}`;
  label?: string;
};

export type ColumnValueType = Link | string | number | boolean | Date | null;

export type ColumnValueTypeNames =
  | "link"
  | "string"
  | "number"
  | "boolean"
  | "date";

export type ColumnValueTypeName<T extends ColumnValueType> = T extends Link
  ? "link"
  : T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends Date
  ? "date"
  : never;

export type ColumnDef<T extends ColumnValueType> = {
  type: ColumnValueTypeName<T>;
  id: number | string;
  generated?: boolean;
};
export type ColumnDefKind = ColumnDef<ColumnValueType>;

export type ReadOnlyColumnDef<T extends ColumnValueType> = ColumnDef<T> & {
  readonly: true;
};
export type FormulaColumnDef<T extends ColumnValueType> =
  ReadOnlyColumnDef<T> & {
    formula: true;
  };
export type SerialColumnDef<T extends ColumnValueType> =
  ReadOnlyColumnDef<T> & {
    serial: true;
    genFn?: (p: number) => T;
  };

export type ColumnDefVariant<T extends ColumnValueType> =
  | ColumnDef<T>
  | ReadOnlyColumnDef<T>
  | FormulaColumnDef<T>
  | SerialColumnDef<T>;

export type PropOfTypeNames<T extends ColumnsMapping, P> = {
  [K in keyof T]: T[K] extends ColumnDefVariant<infer V>
    ? V extends P
      ? K
      : never
    : never;
}[keyof T];

export type PropOfVariantNames<
  T extends ColumnsMapping,
  P extends ColumnDefVariant<any>
> = {
  [K in keyof T]: T[K] extends P ? K : never;
}[keyof T];

export type ColumnsMapping = {
  [key: string]: ColumnDefKind;
};

export function readonly<T extends ColumnValueType>(
  def: ColumnDef<T>
): ReadOnlyColumnDef<T> {
  return { ...def, readonly: true };
}

export function formula<T extends ColumnValueType>(
  def: ColumnDef<T>
): FormulaColumnDef<T> {
  return { ...def, readonly: true, formula: true, generated: true };
}

export function serial<T extends ColumnValueType>(
  def: ColumnDef<T>,
  genFn?: (p: number) => T
): SerialColumnDef<T> {
  return {
    ...def,
    readonly: true,
    serial: true,
    genFn: genFn,
    generated: true,
  };
}

export function text(id: number | string): ColumnDef<string> {
  return { type: "string", id };
}

export function numeric(id: number | string): ColumnDef<number> {
  return { type: "number", id };
}

export function boolean(id: number | string): ColumnDef<boolean> {
  return { type: "boolean", id };
}

export function dateTime(id: number | string): ColumnDef<Date> {
  return { type: "date", id };
}

export function hyperLink(id: number | string): ColumnDef<Link> {
  return { type: "link", id, generated: true };
}

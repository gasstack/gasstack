export type TimeInput = { hours: number; minutes: number };
export type DateInput = { msSinceEpoch: number };
export type DateTimeInput = {
  msSinceEpoch: number;
  hasTime: boolean;
  hasDate: boolean;
};

export type FieldValue =
  | string
  | number
  | TimeInput
  | DateInput
  | DateTimeInput;

export type FieldValueNames<T extends FieldValue> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends DateTimeInput
  ? "datetime"
  : T extends TimeInput
  ? "time"
  : T extends DateInput
  ? "date"
  : never;

export type FieldDefSingle<T extends FieldValue> = {
  type: FieldValueNames<T>;
};

export type FieldDefArray<T extends string | number> = {
  type: FieldValueNames<T>;
  array: true;
};

export type FieldDef<T extends FieldValue> =
  | FieldDefSingle<T>
  | FieldDefArray<string | number>;

export type FormDescriptor = {
  [field: string]: FieldDef<FieldValue>;
};

export type ParsedForm<T extends FormDescriptor> = {
  [K in keyof T]: T[K] extends FieldDefArray<infer A>
    ? A[]
    : T[K] extends FieldDefSingle<infer S>
    ? S
    : never;
};

export type FormValidators<T extends FormDescriptor> = {
  [K in keyof T]: T[K] extends FieldDefArray<infer A>
    ? (value: A[]) => string[] | undefined
    : T[K] extends FieldDefSingle<infer S>
    ? (value: S) => string[] | undefined
    : never;
};

export type FormValidationResult<T extends FormDescriptor> =
  | {
      success: true;
      errors: undefined;
    }
  | {
      success: false;
      errors: { [K in keyof T]: undefined | string[] };
    };

export type FormController<T extends FormDescriptor> = {
  fields: { readonly [K in keyof T]: string };
  parse(event: GoogleAppsScript.Addons.EventObject): ParsedForm<T>;
  validate(value: ParsedForm<T>): FormValidationResult<T>;
};

export function textField(): FieldDefSingle<string> {
  return { type: "string" };
}
export function numberField(): FieldDefSingle<number> {
  return { type: "number" };
}
export function dateField(): FieldDefSingle<DateInput> {
  return { type: "date" };
}
export function timeField(): FieldDefSingle<TimeInput> {
  return { type: "time" };
}
export function datetimeField(): FieldDefSingle<DateTimeInput> {
  return { type: "datetime" };
}
export function arrayField<T extends string | number>(
  def: FieldDefSingle<T>
): FieldDefArray<T> {
  return { type: def.type, array: true };
}

function parseValue(
  field: string,
  def: FieldDef<FieldValue>,
  evt: GoogleAppsScript.Addons.CommonEventObject
): FieldValue | FieldValue[] {
  if (def.type === "string") {
    return "array" in def
      ? evt.formInputs[field].stringInputs.value
      : evt.formInputs[field].stringInputs.value[0];
  } else if (def.type === "number") {
    return "array" in def
      ? evt.formInputs[field].stringInputs.value.map((p) => parseFloat(p))
      : parseFloat(evt.formInputs[field].stringInputs.value[0]);
  } else if (def.type === "date") {
    return {
      msSinceEpoch: parseInt(evt.formInputs[field].dateInput.msSinceEpoch),
    };
  } else if (def.type === "time") {
    return evt.formInputs[field].timeInput;
  } else if (def.type === "datetime") {
    return {
      hasDate: evt.formInputs[field].dateTimeInput.hasDate,
      hasTime: evt.formInputs[field].dateTimeInput.hasTime,
      msSinceEpoch: parseInt(evt.formInputs[field].dateTimeInput.msSinceEpoch),
    };
  } else throw Error(`Unknown field type ${def.type}`);
}

export function buildForm<T extends FormDescriptor>(
  config: T,
  validators?: Partial<FormValidators<T>>
): FormController<T> {
  const keys = Object.keys(config);

  const result = {
    fields: keys.reduce((acc, k) => ({ ...acc, [k]: k }), {} as any),
    parse(evt) {
      return keys.reduce(
        (acc, k) => ({
          ...acc,
          [k]: parseValue(k, config[k], evt.commonEventObject),
        }),
        {} as any
      );
    },
    validate(value: ParsedForm<T>) {
      if (!validators) return { success: true, errors: undefined };

      const errors = Object.keys(validators).reduce(
        (acc, v) => ({ ...acc, [v]: validators[v](value[v] as any) }),
        {} as any
      );

      return {
        success: !Object.keys(errors).find((p) => errors[p] !== undefined),
        errors,
      };
    },
  } satisfies FormController<T>;

  return result;
}

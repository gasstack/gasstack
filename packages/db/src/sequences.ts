import { ContextRef } from "./context";
import { ColumnsMapping, PropOfVariantNames, SerialColumnDef } from "./schema";
import { Context, getObject } from "./utils";

function seqEntryName<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  key: PropOfVariantNames<T, SerialColumnDef<any>>
): string {
  const pctx: Context<T> = getObject(ctx);
  return Utilities.base64Encode(
    Utilities.computeDigest(
      Utilities.DigestAlgorithm.SHA_256,
      `${pctx.spreadsheet.getId()}/${JSON.stringify(pctx.rangeDef)}/${String(
        key
      )}`
    )
  );
}

/**
 * Gets the current value of the sequence.
 * @param ctx Context reference.
 * @param key Name of the field sequence.
 * @returns Current value of the sequence.
 */
export function seqCurrent<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  key: PropOfVariantNames<T, SerialColumnDef<any>>
): number | null {
  const pctx: Context<T> = getObject(ctx);
  const value = pctx.metadata.get(seqEntryName(ctx, key));
  return !value ? null : parseInt(value);
}

/**
 * Increment the value of the sequence and returns it.
 * @param ctx Context reference.
 * @param key Name of the field sequence.
 * @returns Current value of the sequence.
 */
export function seqNext<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  key: PropOfVariantNames<T, SerialColumnDef<any>>
): number {
  const pctx: Context<T> = getObject(ctx);
  const entryName = seqEntryName(ctx, key);
  const value = pctx.metadata.get(entryName);
  const nextValue = !value ? 1 : parseInt(value) + 1;

  pctx.metadata.set(entryName, `${nextValue}`);
  return nextValue;
}

/**
 * Resets the value of the sequence to a given value and returns it.
 * @param ctx Gets the current value of the sequence.
 * @param key Name of the field sequence.
 * @param value Value to which reset the sequence.
 * @returns Current value of the sequence.
 */
export function seqReset<T extends ColumnsMapping>(
  ctx: ContextRef<T>,
  key: PropOfVariantNames<T, SerialColumnDef<any>>,
  value: number = 0
): void {
  const pctx: Context<T> = getObject(ctx);
  pctx.metadata.set(seqEntryName(ctx, key), `${value}`);
}

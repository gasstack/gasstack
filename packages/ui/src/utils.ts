export function fnName(fn: (...args: any[]) => any) {
  if (!fn) throw new Error("Null functions not allowed");
  if (fn.name === "") throw new Error("Anonymous functions not allowed");

  return fn.name;
}

export function ifDef<T>(
  value: T,
  fn: (value: T) => void,
  elseFn?: () => void
) {
  if (value !== undefined) fn(value);
  else if (elseFn !== undefined) elseFn();
}

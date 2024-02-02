import { jsxBuildFn, traverse } from "./core/types";

export const jsx = traverse;

export function jsxs(): jsxBuildFn {
  return (parent) => parent;
}

export function Fragment(): jsxBuildFn {
  return (parent) => parent;
}

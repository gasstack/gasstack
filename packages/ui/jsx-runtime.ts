import { FC } from "./src/types";

export type Props = Record<string, object> & { children: object };

export function jsx(element: any, props: Props) {
  if (typeof element !== "function") return element;
  else {
    return element(props);
  }
}

export function jsxs(element: any, props: Props) {
  if (typeof element !== "function") return element;
  else {
    return element(props);
  }
}

export function Fragment(props: Props) {
  return Array.isArray(props.children) ? props.children : [props.children];
}

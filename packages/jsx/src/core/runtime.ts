import { jsxBuildFn, jsxFC } from "./types";

export function traverse(
  element: jsxFC,
  props: Record<string, any> & { children?: jsxBuildFn[] }
): jsxBuildFn {
  return ((parent) => {
    state.parent = parent;
    const current = element(props);
    if (props.children) {
      const children = Array.isArray(props.children)
        ? props.children
        : [props.children];
      children.forEach((child) => {
        child(current);
      });
    }

    const result = state.complete?.();
    state.complete = null;
    state.parent = null;

    return result;
  }) satisfies jsxBuildFn;
}

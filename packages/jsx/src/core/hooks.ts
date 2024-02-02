type State = { parent?: any; complete?: () => any };
const state = {
  state: null as State,
};

export function changeState(fn: (old: State) => State) {
  state.state = fn(state.state);
}

export function useParent<T = any>(): T {
  return state.state.parent;
}
export function useComplete<T = any>(fn: () => T): void {
  if (!!fn) state.state.complete = fn;
}

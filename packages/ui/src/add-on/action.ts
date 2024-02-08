import { fnName } from "./utils";
import { uiFC } from "../core";
import {
  ActionResponseTypes,
  UiCallbackFn,
  UiCallbackSetter,
} from "./callbacks";

export type ActionProps<T extends ActionResponseTypes = any> = {
  /** Sets the loading indicator that displays while the action is in progress. */
  loadIndicator?: GoogleAppsScript.Card_Service.LoadIndicator;
  /**
   * Indicates whether form values are determined by the client's values or the server's values after an action response updates the form's Card. When set to true, the client's values persist after the server response. When set to false, the server's values overwrite the form values. Defaults to false.
   * Persisting the client values helps prevent situations where a form changes unexpectedly after a user makes an edit. For example, if a user makes an edit to a TextInput after submitting a form, but before the server responds. If the values are persisted, the edit the user made remains after the server response updates the Card; otherwise the form value returns to the value that the user originally submitted to the form.
   * Persisting client values can interfere with your script's ability to clear form fields or override form values, so avoid turning on persistence for that type of functionality. Without persistence, it's recommended that you use the LoadIndicator.SPINNER for events, because this locks the UI and prevents user edits before the server responds. Alternatively, you can use LoadIndicator.NONE and make sure every element in the form has an onChange action.
   */
  persistClientValues?: boolean;
} & (
  | {
      /**
       * Setter obtained from a UiCallback provider, result of the configureUiCallbacks function.
       */
      callback: UiCallbackSetter<T>;
    }
  | {
      /** Sets the name of the callback function to be called. */
      fn: UiCallbackFn<T>;
      /** Allows custom parameters to be passed to the callback function. */
      parameters?: Record<string, string>;
    }
);

export type UiAction<T extends ActionResponseTypes> =
  GoogleAppsScript.Card_Service.Action & T;

/**
 * Creates a Action object.
 * @param props Props to build the Action.
 * @returns Action object.
 */
export const Action = (<T extends ActionResponseTypes>(
  props: ActionProps<T>
) => {
  const action = CardService.newAction();

  if (props.loadIndicator) action.setLoadIndicator(props.loadIndicator);
  if (props.persistClientValues !== undefined)
    (action as any).setPersistValues(props.persistClientValues);

  if ("callback" in props) {
    props.callback(action);
  } else {
    action.setFunctionName(fnName(props.fn));
    if (props.parameters) action.setParameters(props.parameters);
  }

  return action as UiAction<T>;
}) satisfies uiFC<
  UiAction<ActionResponseTypes>,
  ActionProps<ActionResponseTypes>
>;

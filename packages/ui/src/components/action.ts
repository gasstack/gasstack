import { enumLoadIndicator, ifDef } from "../utils";
import { ActionFC, LoadIndicator, ResponseComponent } from "../types";
import { ActionBuilder, RoutedAction } from "../actions-router";
import { RoutedFunctionKey } from "../functions-router";

export type ActionProps<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
> = {
  /** Sets the loading indicator that displays while the action is in progress. */
  loadIndicator?: LoadIndicator;
  /**
   * Indicates whether form values are determined by the client's values or the server's values after an action response updates the form's Card. When set to true, the client's values persist after the server response. When set to false, the server's values overwrite the form values. Defaults to false.
   * Persisting the client values helps prevent situations where a form changes unexpectedly after a user makes an edit. For example, if a user makes an edit to a TextInput after submitting a form, but before the server responds. If the values are persisted, the edit the user made remains after the server response updates the Card; otherwise the form value returns to the value that the user originally submitted to the form.
   * Persisting client values can interfere with your script's ability to clear form fields or override form values, so avoid turning on persistence for that type of functionality. Without persistence, it's recommended that you use the LoadIndicator.SPINNER for events, because this locks the UI and prevents user edits before the server responds. Alternatively, you can use LoadIndicator.NONE and make sure every element in the form has an onChange action.
   */
  persistClientValues?: boolean;
  /** Allows custom parameters to be passed to the callback function. */
  parameters?: Record<string, string>;
} & (
  | {
      /**
       * Managed action builder from the router.
       */
      builder: ActionBuilder<T, E>;
    }
  | {
      /** Sets the name of the callback function to be called. */
      functionName: RoutedFunctionKey<[E], T>;
    }
);

/**
 * Creates a Action object.
 * @param props Props to build the Action.
 * @returns Action object.
 */
export const Action = (<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
>(
  props: ActionProps<T, E>
) => {
  let action: any = null;
  if ("builder" in props) {
    action = props.builder(
      props.parameters,
      props.loadIndicator,
      props.persistClientValues
    );
  } else {
    action = CardService.newAction();

    ifDef(props.loadIndicator, (l) =>
      action.setLoadIndicator(enumLoadIndicator(l))
    );
    ifDef(props.persistClientValues, action.setPersistValues);
    action.setFunctionName(props.functionName);
    ifDef(props.parameters, action.setParameters);
  }

  return action as RoutedAction<T, E>;
}) satisfies ActionFC<
  RoutedAction<ResponseComponent, any>,
  ActionProps<ResponseComponent, any>
>;

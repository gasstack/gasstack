import { UiAction } from ".";
import { uiFC } from "../core";

export type TextInputProps = {
  /** Sets the key that identifies this text input in the event object that is generated when there is a UI interaction. Not visible to the user. Required, must be unique. */
  fieldName: string;
  /** Sets the title to be shown above the input field. Required. */
  title: string;
  /** Sets a hint for the text input. Used to give the user extra guidance on what to input. For example, a hint could describe formatting ("xxx-xxx-xxxx") for a phone number field. */
  hint?: string;
  /** Sets whether the input text shows on one line or multiple lines. */
  multiline?: boolean;
  /** Sets an action to be performed whenever the text input changes. */
  onChange?: UiAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets the suggestions for autocompletion in the text field. */
  suggestions?:
    | GoogleAppsScript.Card_Service.Suggestions
    | UiAction<GoogleAppsScript.Card_Service.SuggestionsResponse>;
  /** Sets the pre-filled value to be set in the input field. */
  value?: string;
};

/**
 * A input field widget that accepts text input.
 * @param props Props to build the TextInput object.
 * @returns TextInput object.
 */
export const TextInput: uiFC<
  GoogleAppsScript.Card_Service.TextInput,
  TextInputProps
> = (props) => {
  const item = CardService.newTextInput()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  if (props.hint !== undefined) item.setHint(props.hint);
  if (props.value !== undefined) item.setValue(props.value);
  if (props.onChange !== undefined) item.setOnChangeAction(props.onChange);

  item.setMultiline(!!props.multiline);

  if (props.suggestions) {
    if ("addSuggestion" in props.suggestions)
      item.setSuggestions(props.suggestions);
    else item.setSuggestionsAction(props.suggestions);
  }

  return item;
};

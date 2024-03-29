import { ActionPropType } from "../actions-router";
import { FC, SelectionInputType, SwitchControlType } from "../types";
import {
  buildAction,
  buildActionSetter,
  enumSelectionInputType,
  enumSwitchControlType,
  getArray,
  ifDef,
} from "../utils";

export type SelectionInputOption = {
  text: string;
  value: string;
  selected?: boolean;
};

export type SelectionInputProps = {
  /** Sets the key that identifies this selection input in the event object that is generated when there is a UI interaction. Not visible to the user. Required, must be unique.   */
  fieldName: string;
  /** Sets an Action to be performed whenever the selection input changes. */
  onChange?: ActionPropType<
    GoogleAppsScript.Card_Service.ActionResponse,
    GoogleAppsScript.Addons.EventObject
  >;
  /** Sets the title displayed above the input field. */
  title: string;
  /** Sets the items that can be selected. */
  options?: SelectionInputOption[];
  /** Sets the type of this input. Defaults to CHECKBOX. */
  type?: SelectionInputType;

  children?: SelectionInputOption | SelectionInputOption[];
};

/**
 * An input field that allows choosing between a set of predefined options.
 * @param props Props to build the SelectionInput.
 * @returns The SelectionInput object.
 */
export const SelectionInput: FC<
  GoogleAppsScript.Card_Service.SelectionInput,
  SelectionInputProps
> = (props) => {
  const item = CardService.newSelectionInput()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  getArray(props.options).forEach((p) =>
    item.addItem(p.text, p.value, !!p.selected)
  );

  ifDef(props.type, (t) => item.setType(enumSelectionInputType(t)));
  ifDef(props.onChange, buildActionSetter(item.setOnChangeAction));

  getArray(props.children).forEach((p) =>
    item.addItem(p.text, p.value, !!p.selected)
  );

  return item;
};

export type SwitchProps = {
  /** Sets the key that identifies this switch in the event object that is generated when there is a UI interaction. Not visible to the user. Required.
   * Unlike other form fields, this field name does not need to be unique. The form input values for switches using the same field name are returned as an array. The array consists of the values for all enabled switches with that field name.
   */
  fieldName: string;
  /** Sets the action to take when the switch is toggled. */
  onChange?: ActionPropType<
    GoogleAppsScript.Card_Service.ActionResponse,
    GoogleAppsScript.Addons.EventObject
  >;
  /** Sets whether this switch should start as selected or unselected. */
  selected?: boolean;
  /** Sets the value that is sent as the form input when this switch is toggled on. */
  value: string;
  /** Sets the control type of the switch. Defaults to SWITCH. */
  type?: SwitchControlType;
};

/**
 * A UI element that supports being toggled on or off. This can only be used within a DecoratedText widget.
 * @param props Props to build the Switch.
 * @returns The Switch object.
 */
export const Switch: FC<GoogleAppsScript.Card_Service.Switch, SwitchProps> = (
  props
) => {
  const item = CardService.newSwitch()
    .setFieldName(props.fieldName)
    .setValue(props.value);

  ifDef(props.type, (t) => item.setControlType(enumSwitchControlType(t)));
  ifDef(props.onChange, buildActionSetter(item.setOnChangeAction));

  item.setSelected(!!props.selected);

  return item;
};

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
  onChange?: ActionPropType<
    GoogleAppsScript.Card_Service.ActionResponse,
    GoogleAppsScript.Addons.EventObject
  >;
  /** Sets the suggestions for autocompletion in the text field. */
  suggestions?:
    | GoogleAppsScript.Card_Service.Suggestions
    | ActionPropType<
        GoogleAppsScript.Card_Service.SuggestionsResponse,
        GoogleAppsScript.Addons.EventObject
      >;
  /** Sets the pre-filled value to be set in the input field. */
  value?: string;
};

/**
 * A input field widget that accepts text input.
 * @param props Props to build the TextInput object.
 * @returns TextInput object.
 */
export const TextInput: FC<
  GoogleAppsScript.Card_Service.TextInput,
  TextInputProps
> = (props) => {
  const item = CardService.newTextInput()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  ifDef(props.hint, item.setHint);
  ifDef(props.value, item.setValue);
  ifDef(props.onChange, buildActionSetter(item.setOnChangeAction));

  item.setMultiline(!!props.multiline);

  ifDef(props.suggestions, (sug) => {
    if ("addSuggestion" in sug) item.setSuggestions(sug);
    else item.setSuggestionsAction(buildAction(sug));
  });

  return item;
};

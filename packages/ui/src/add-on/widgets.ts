import { UiAction } from ".";
import { uiFC } from "../core";

export type DatePickerProps = {
  /** Sets the field name that identifies this picker in the event object that is generated when there is a UI interaction. The field name is visible to the user. Required; the specified field name must be unique. */
  fieldName: string;
  /** Sets an Action that the script performs whenever the picker input changes. */
  onChange?: UiAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets the title displayed above the input field. */
  title: string;
  /** Sets the prefilled value to be set in the input field. The default value placed in the input as a number, in milliseconds since the epoch. Only the date of the epoch time is used, and the time of the epoch time is discarded. It is always represented as a string in the form callback parameters. */
  value?: number;
};

/**
 * An input field that allows inputing a date.
 * @param props Props to build the DatePicker.
 * @returns The DatePicker object.
 */
export const DatePicker: uiFC<
  GoogleAppsScript.Card_Service.DatePicker,
  DatePickerProps
> = (props) => {
  const item = CardService.newDatePicker()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  if (props.value !== undefined) item.setValueInMsSinceEpoch(props.value);
  if (props.onChange) item.setOnChangeAction(props.onChange);

  return item;
};

export type DateTimePickerProps = {
  /** Sets the field name that identifies this picker in the event object that is generated when there is a UI interaction. The field name is visible to the user. Required; the specified field name must be unique. */
  fieldName: string;
  /** Sets an Action that the script performs whenever the picker input changes. */
  onChange?: UiAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets the title displayed above the input field. */
  title: string;
  /** Sets the prefilled value to be set in the input field. The default value placed in the input as a number, in milliseconds since the epoch. Only the date of the epoch time is used, and the time of the epoch time is discarded. It is always represented as a string in the form callback parameters. */
  value?: number;
  /** Sets the number of minutes that the time zone should be offset from UTC. If set, the date and time is displayed in the specified time zone. If not set, the time is displayed in the user's time zone. */
  timezoneOffset?: number;
};

/**
 * An input field that allows users to input a date and time.
 * @param props Props to build the DateTimePicker.
 * @returns The DateTimePicker object.
 */
export const DateTimePicker: uiFC<
  GoogleAppsScript.Card_Service.DateTimePicker,
  DateTimePickerProps
> = (props) => {
  const item = CardService.newDateTimePicker()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  if (props.value !== undefined) item.setValueInMsSinceEpoch(props.value);
  if (props.onChange) item.setOnChangeAction(props.onChange);
  if (props.timezoneOffset) item.setTimeZoneOffsetInMins(props.timezoneOffset);

  return item;
};

export type DecoratedTextProps = {
  /** Sets the text to be used as the value. Supports basic HTML formatting. */
  text: string;
  /** Sets the label text to be used as the key and is displayed below the text content. */
  bottomLabel?: string;
  /**
   * A DecoratedText can only support one button, one switch or one icon to the end side.
   */
  control?:
    | GoogleAppsScript.Card_Service.Button
    | GoogleAppsScript.Card_Service.Switch
    | GoogleAppsScript.Card_Service.IconImage;
  /** Sets the optional IconImage to display before the text content. */
  startIcon?: GoogleAppsScript.Card_Service.IconImage;
  /** Sets the label text to be used as the key and is displayed above the text content. */
  topLabel?: string;
  /** Sets whether the value text should be displayed on a single line or multiple lines. If true, the text is wrapped and displayed on multiple lines. Otherwise the text is truncated. */
  wrap?: boolean;
};

/**
 * A widget that displays text with optional decorations. Possible keys include an icon, a label above and a label below.
 * @param props Props to build the DecoratedText.
 * @returns The DecoratedText object.
 */
export const DecoratedText: uiFC<
  GoogleAppsScript.Card_Service.DecoratedText,
  DecoratedTextProps
> = (props) => {
  const item = CardService.newDecoratedText().setText(props.text);

  if (props.bottomLabel) item.setBottomLabel(props.bottomLabel);
  if (props.topLabel) item.setTopLabel(props.topLabel);
  if (props.startIcon) item.setStartIcon(props.startIcon);
  if (props.wrap != undefined) item.setWrapText(props.wrap);
  if (props.control) {
    if ("setAltText" in props.control) item.setEndIcon(props.control);
    else if ("setControlType" in props.control)
      item.setSwitchControl(props.control);
    else item.setButton(props.control);
  }

  return item;
};

/**
 * A horizontal divider.
 * @returns The Divider object.
 */
export const Divider: uiFC<
  GoogleAppsScript.Card_Service.Divider,
  void
> = () => {
  return CardService.newDivider();
};

export type SelectionInputProps = {
  /** Sets the key that identifies this selection input in the event object that is generated when there is a UI interaction. Not visible to the user. Required, must be unique.   */
  fieldName: string;
  /** Sets an Action to be performed whenever the selection input changes. */
  onChange?: UiAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets the title displayed above the input field. */
  title: string;
  /** Sets the items that can be selected. */
  options: { text: string; value: string; selected?: boolean }[];
  /** Sets the type of this input. Defaults to CHECKBOX. */
  type?: GoogleAppsScript.Card_Service.SelectionInputType;
};

/**
 * An input field that allows choosing between a set of predefined options.
 * @param props Props to build the SelectionInput.
 * @returns The SelectionInput object.
 */
export const SelectionInput: uiFC<
  GoogleAppsScript.Card_Service.SelectionInput,
  SelectionInputProps
> = (props) => {
  const item = CardService.newSelectionInput()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  props.options.forEach((p) => item.addItem(p.text, p.value, !!p.selected));

  if (props.type !== undefined) item.setType(props.type);
  if (props.onChange) item.setOnChangeAction(props.onChange);

  return item;
};

/**
 * Autocomplete suggestions to supplement a TextInput widget.
 * @param props Props to build the Suggestions object.
 * @returns Suggestions object.
 */
export const Suggestions: uiFC<
  GoogleAppsScript.Card_Service.Suggestions,
  {
    /** Text suggestions. */
    suggestions: string[];
  }
> = (props) => {
  const item = CardService.newSuggestions();

  item.addSuggestions(props.suggestions);

  return item;
};

export type SwitchProps = {
  /** Sets the key that identifies this switch in the event object that is generated when there is a UI interaction. Not visible to the user. Required.
   * Unlike other form fields, this field name does not need to be unique. The form input values for switches using the same field name are returned as an array. The array consists of the values for all enabled switches with that field name.
   */
  fieldName: string;
  /** Sets the action to take when the switch is toggled. */
  onChange?: UiAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets whether this switch should start as selected or unselected. */
  selected?: boolean;
  /** Sets the value that is sent as the form input when this switch is toggled on. */
  value: string;
  /** Sets the control type of the switch. Defaults to SWITCH. */
  type?: GoogleAppsScript.Card_Service.SwitchControlType;
};

/**
 * A UI element that supports being toggled on or off. This can only be used within a DecoratedText widget.
 * @param props Props to build the Switch.
 * @returns The Switch object.
 */
export const Switch: uiFC<GoogleAppsScript.Card_Service.Switch, SwitchProps> = (
  props
) => {
  const item = CardService.newSwitch()
    .setFieldName(props.fieldName)
    .setValue(props.value);

  if (props.type !== undefined) item.setControlType(props.type);
  if (props.onChange) item.setOnChangeAction(props.onChange);

  item.setSelected(!!props.selected);

  return item;
};

export type TextButtonProps = {
  /** Sets the alternative text of the button for accessibility. If unset, defaults to the text that displays on the button. */
  altText?: string;
  /** Sets the background color in #rgb format for TextButtonStyle.FILLED button. If unset for a TextButtonStyle.FILLED button, the button uses the secondary color defined in the add-on manifest. This method is a no-op for TextButtonStyle.TEXT buttons. */
  backgroundColor?: `#${string}`;
  /** Sets whether the button is disabled. A disabled button is greyed out and cannot be clicked. */
  disabled?: boolean;
  /** Sets the text that displays on the button. */
  text: string;
};

/**
 * A TextButton with a text label. You can set the background color and deactivate the button when needed.
 * @param props Props to build the TextButton.
 * @returns TextButton object.
 */
export const TextButton: uiFC<
  GoogleAppsScript.Card_Service.TextButton,
  TextButtonProps
> = (props) => {
  const item = CardService.newTextButton().setText(props.text);

  if (props.altText) (item as any).setAltText(props.altText);
  item.setDisabled(!!props.disabled);

  if (props.backgroundColor) {
    item.setTextButtonStyle(CardService.TextButtonStyle.FILLED);
    item.setBackgroundColor(props.backgroundColor);
  } else item.setTextButtonStyle(CardService.TextButtonStyle.TEXT);

  return item;
};

/**
 * A widget that displays text and supports basic HTML formatting.
 * @param props Props to build the TextParagraph.
 * @returns TextParagraph object.
 */
export const TextParagraph: uiFC<
  GoogleAppsScript.Card_Service.TextParagraph,
  {
    /** Sets the text of the paragraph. Required. */
    text: string;
  }
> = (props) => {
  return CardService.newTextParagraph().setText(props.text);
};

export type TimePickerProps = {
  /** Sets the field name that identifies this picker in the event object that is generated when there is a UI interaction. The field name is visible to the user. Required; the specified field name must be unique. */
  fieldName: string;
  /** Sets the prefilled hours value to set in the input field, range from 0 to 23. It is always represented as a string in the form callback parameters. */
  hours?: number;
  /** Sets the prefilled minutes value to set in the input field, range from 0 to 59. It is always represented as a string in the form callback parameters. */
  minutes?: number;
  /** Sets an Action that the script performs whenever the picker input changes. */
  onChange?: UiAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets the title displayed above the input field. */
  title: string;
};

/**
 * An input field that allows users to input a time.
 * @param props Props to build the TimePicker.
 * @returns The TimePicker object.
 */
export const TimePicker: uiFC<
  GoogleAppsScript.Card_Service.TimePicker,
  TimePickerProps
> = (props) => {
  const item = CardService.newTimePicker()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  if (props.hours !== undefined) item.setHours(props.hours);
  if (props.minutes !== undefined) item.setMinutes(props.minutes);
  if (props.onChange) item.setOnChangeAction(props.onChange);

  return item;
};

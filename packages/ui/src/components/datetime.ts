import { FC } from "../types";
import { ifDef } from "../utils";
import { RoutedAction } from "./action";

export type TimePickerProps = {
  /** Sets the field name that identifies this picker in the event object that is generated when there is a UI interaction. The field name is visible to the user. Required; the specified field name must be unique. */
  fieldName: string;
  /** Sets the prefilled hours value to set in the input field, range from 0 to 23. It is always represented as a string in the form callback parameters. */
  hours?: number;
  /** Sets the prefilled minutes value to set in the input field, range from 0 to 59. It is always represented as a string in the form callback parameters. */
  minutes?: number;
  /** Sets an Action that the script performs whenever the picker input changes. */
  onChange?: RoutedAction<GoogleAppsScript.Card_Service.ActionResponse>;
  /** Sets the title displayed above the input field. */
  title: string;
};

/**
 * An input field that allows users to input a time.
 * @param props Props to build the TimePicker.
 * @returns The TimePicker object.
 */
export const TimePicker: FC<
  GoogleAppsScript.Card_Service.TimePicker,
  TimePickerProps
> = (props) => {
  const item = CardService.newTimePicker()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  ifDef(props.hours, item.setHours);
  ifDef(props.minutes, item.setMinutes);
  ifDef(props.onChange, item.setOnChangeAction);

  return item;
};

export type DatePickerProps = {
  /** Sets the field name that identifies this picker in the event object that is generated when there is a UI interaction. The field name is visible to the user. Required; the specified field name must be unique. */
  fieldName: string;
  /** Sets an Action that the script performs whenever the picker input changes. */
  onChange?: RoutedAction<GoogleAppsScript.Card_Service.ActionResponse>;
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
export const DatePicker: FC<
  GoogleAppsScript.Card_Service.DatePicker,
  DatePickerProps
> = (props) => {
  const item = CardService.newDatePicker()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  ifDef(props.value, item.setValueInMsSinceEpoch);
  ifDef(props.onChange, item.setOnChangeAction);

  return item;
};

export type DateTimePickerProps = {
  /** Sets the field name that identifies this picker in the event object that is generated when there is a UI interaction. The field name is visible to the user. Required; the specified field name must be unique. */
  fieldName: string;
  /** Sets an Action that the script performs whenever the picker input changes. */
  onChange?: RoutedAction<GoogleAppsScript.Card_Service.ActionResponse>;
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
export const DateTimePicker: FC<
  GoogleAppsScript.Card_Service.DateTimePicker,
  DateTimePickerProps
> = (props) => {
  const item = CardService.newDateTimePicker()
    .setFieldName(props.fieldName)
    .setTitle(props.title);

  ifDef(props.value, item.setValueInMsSinceEpoch);
  ifDef(props.onChange, item.setOnChangeAction);
  ifDef(props.timezoneOffset, item.setTimeZoneOffsetInMins);

  return item;
};

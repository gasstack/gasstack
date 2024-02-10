import { FC } from "../types";
import { UrlString, ifDef } from "../utils";
import { ActionTargetProps, withAction } from "./action-target-utils";

/**
 * Holds a set of Button objects that are displayed in a row.
 * @param buttons Set of Buttons.
 * @returns ButtonSet object.
 */
export const ButtonSet: FC<
  GoogleAppsScript.Card_Service.ButtonSet,
  GoogleAppsScript.Card_Service.Button[]
> = (buttons) => {
  const set = CardService.newButtonSet();

  buttons.forEach((btn) => set.addButton(btn));

  return set;
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
} & ActionTargetProps;

/**
 * A TextButton with a text label. You can set the background color and deactivate the button when needed.
 * @param props Props to build the TextButton.
 * @returns TextButton object.
 */
export const TextButton: FC<
  GoogleAppsScript.Card_Service.TextButton,
  TextButtonProps
> = (props) => {
  const item = CardService.newTextButton().setText(props.text);

  ifDef(props.altText, (item as any).setAltText);

  item.setDisabled(!!props.disabled);

  ifDef(
    props.backgroundColor,
    (bg) => {
      item.setTextButtonStyle(CardService.TextButtonStyle.FILLED);
      item.setBackgroundColor(bg);
    },
    () => item.setTextButtonStyle(CardService.TextButtonStyle.TEXT)
  );

  withAction(item, props);

  return item;
};

export type ImageButtonProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the predefined icon if the URL is not set. Default is NONE. Sets the URL of the icon if the icon is not set. */
  icon: GoogleAppsScript.Card_Service.Icon | UrlString;
} & ActionTargetProps;

/**
 * A ImageButton with an image displayed on it.
 * @param props Props to build the ImageButton.
 * @returns ImageButton object.
 */
export const ImageButton: FC<
  GoogleAppsScript.Card_Service.ImageButton,
  ImageButtonProps
> = (props) => {
  const item = CardService.newImageButton();

  if (typeof props.icon === "string") item.setIconUrl(props.icon);
  else item.setIcon(props.icon);

  ifDef(props.altText, item.setAltText);

  withAction(item, props);

  return item;
};

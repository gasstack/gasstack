import { FC } from "../types";
import { ifDef } from "../utils";
import { ActionTargetProps, withAction } from "./action-target-utils";

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
} & ActionTargetProps;

/**
 * A widget that displays text with optional decorations. Possible keys include an icon, a label above and a label below.
 * @param props Props to build the DecoratedText.
 * @returns The DecoratedText object.
 */
export const DecoratedText: FC<
  GoogleAppsScript.Card_Service.DecoratedText,
  DecoratedTextProps
> = (props) => {
  const item = CardService.newDecoratedText().setText(props.text);

  ifDef(props.bottomLabel, item.setBottomLabel);
  ifDef(props.topLabel, item.setTopLabel);
  ifDef(props.startIcon, item.setStartIcon);
  ifDef(props.wrap, item.setWrapText);
  ifDef(props.control, (ctrl) => {
    if ("setImageCropType" in ctrl) item.setEndIcon(ctrl);
    else if ("setControlType" in ctrl) item.setSwitchControl(ctrl);
    else item.setButton(ctrl);
  });

  withAction(item, props);

  return item;
};

/**
 * A widget that displays text and supports basic HTML formatting.
 *
 * Bold	<b>bold</b>
 * Italics	<i>italics</i>
 * Underline	<u>underline</u>
 * Strikethrough	<s>strikethrough</s>
 * Font color	<font color=\"#FF0000\">red font</font>
 * Hyperlink	<a href=\"https://www.google.com\">hyperlink</a>
 * Time	<time>2023-02-16 15:00</time>
 * Newline	<br>
 * @param props Props to build the TextParagraph.
 * @returns TextParagraph object.
 */
export const TextParagraph: FC<
  GoogleAppsScript.Card_Service.TextParagraph,
  {
    /** Sets the text of the paragraph. Required. */
    text: string;
  }
> = (props) => {
  return CardService.newTextParagraph().setText(props.text);
};

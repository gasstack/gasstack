import { FC } from "../types";
import { ImageBase64, UrlString } from "../types";
import { ifDef } from "../utils";
import { ActionTargetProps, withAction } from "./action-target-utils";

export type IconImageProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the predefined icon if the URL is not set. Default is NONE. Sets the URL of the icon if the icon is not set. */
  icon: GoogleAppsScript.Card_Service.Icon | UrlString;
  /** Sets the crop style for the image. The crop type options you can use for icons are SQUARE and CIRCLE. Default is SQUARE. */
  crop?: GoogleAppsScript.Card_Service.ImageCropType;
};

/**
 * A predefined icon or an icon from a URL with a customizable crop style.
 * @param props Props to build the IconImage.
 * @returns IconImage object.
 */
export const IconImage: FC<
  GoogleAppsScript.Card_Service.IconImage,
  IconImageProps
> = (props) => {
  const item = CardService.newIconImage();

  if (typeof props.icon === "string") item.setIconUrl(props.icon);
  else item.setIcon(props.icon);

  ifDef(props.altText, item.setAltText);
  ifDef(props.crop, item.setImageCropType);

  return item;
};

export type ImageProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the image to use by providing its URL or data string. */
  url: UrlString | ImageBase64;
} & ActionTargetProps;

/**
 * A widget that shows a single image.
 * @param props Props to build the Image.
 * @returns Image object.
 */
export const Image: FC<GoogleAppsScript.Card_Service.Image, ImageProps> = (
  props
) => {
  const item = CardService.newImage();

  item.setImageUrl(props.url);

  ifDef(props.altText, item.setAltText);

  withAction(item, props);

  return item;
};

import { uiFC } from "../core";
import { ImageBase64 } from "../utils";

export type IconImageProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the predefined icon if the URL is not set. Default is NONE. Sets the URL of the icon if the icon is not set. */
  icon: GoogleAppsScript.Card_Service.Icon | `https://${string}`;
  /** Sets the crop style for the image. The crop type options you can use for icons are SQUARE and CIRCLE. Default is SQUARE. */
  crop?: GoogleAppsScript.Card_Service.ImageCropType;
};

/**
 * A predefined icon or an icon from a URL with a customizable crop style.
 * @param props Props to build the IconImage.
 * @returns IconImage object.
 */
export const IconImage: uiFC<
  GoogleAppsScript.Card_Service.IconImage,
  IconImageProps
> = (props) => {
  const item = CardService.newIconImage();

  if (typeof props.icon === "string") item.setIconUrl(props.icon);
  else item.setIcon(props.icon);

  if (props.altText) item.setAltText(props.altText);
  if (props.crop) item.setImageCropType(props.crop);

  return item;
};

export type ImageProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the image to use by providing its URL or data string. */
  url: `https://${string}` | ImageBase64;
};

/**
 * A widget that shows a single image.
 * @param props Props to build the Image.
 * @returns Image object.
 */
export const Image: uiFC<GoogleAppsScript.Card_Service.Image, ImageProps> = (
  props
) => {
  const item = CardService.newImage();

  item.setImageUrl(props.url);

  if (props.altText) item.setAltText(props.altText);

  return item;
};

export type ImageButtonProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the predefined icon if the URL is not set. Default is NONE. Sets the URL of the icon if the icon is not set. */
  icon: GoogleAppsScript.Card_Service.Icon | `https://${string}`;
};

/**
 * A ImageButton with an image displayed on it.
 * @param props Props to build the ImageButton.
 * @returns ImageButton object.
 */
export const ImageButton: uiFC<
  GoogleAppsScript.Card_Service.ImageButton,
  ImageButtonProps
> = (props) => {
  const item = CardService.newImageButton();

  if (typeof props.icon === "string") item.setIconUrl(props.icon);
  else item.setIcon(props.icon);

  if (props.altText) item.setAltText(props.altText);

  return item;
};

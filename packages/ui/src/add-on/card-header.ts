import { uiFC } from "../core";
import { ImageBase64 } from "./utils";

export type CardHeaderProps = {
  /** Sets the title of the card header. */
  title: string;
  /** Sets the subtitle of the card header. */
  subtitle?: string;
  /**
   * Sets the image to use in the header by providing its URL or data string.
   * The provided URL can either be a publicly accessible URL or a base64 encoded image string.
   */
  imageUrl?: `https://${string}` | ImageBase64;
  /** Sets the alternative text for the header image. */
  imageAltText?: string;
  /** Sets the cropping of the icon in the card header. Defaults to no crop. */
  imageStyle?: GoogleAppsScript.Card_Service.ImageStyle;
};

/**
 * Creates a CardHeader object.
 * @param props Props to build the CardHeader.
 * @returns CardHeader object.
 */
export const CardHeader: uiFC<
  GoogleAppsScript.Card_Service.CardHeader,
  CardHeaderProps
> = (props) => {
  const header = CardService.newCardHeader();

  if (props.title) header.setTitle(props.title);
  if (props.subtitle) header.setSubtitle(props.subtitle);
  if (props.imageUrl) header.setImageUrl(props.imageUrl);
  if (props.imageStyle) header.setImageStyle(props.imageStyle);
  if (props.imageAltText) header.setImageAltText(props.imageAltText);

  return header;
};

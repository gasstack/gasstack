//TODO: review everything
/**
 * A class that represents a complete border style that can be applied to widgets.
 * @param color The color in #RGB format to be applied to the border.
 * @param radius The corner radius to be applied to the border.
 * @param type Sets the type of the border.
 * @returns Border object.
 */
export function border(
  color: `#${string}`,
  radius?: number,
  type?: GoogleAppsScript.Card_Service.BorderType
) {
  const item = CardService.newBorderStyle();

  if (radius !== undefined) item.setCornerRadius(radius);
  if (color) item.setStrokeColor(color);
  if (type) item.setType(type);

  return item;
}

export type ImageCropStyleProps = {
  /** Sets the aspect ratio to use if the crop type is RECTANGLE_CUSTOM. The ratio must be a positive value. */
  aspectRatio?: number;
  /** Sets the crop type for the image. Default is SQUARE. */
  type?: GoogleAppsScript.Card_Service.ImageCropType;
};

/**
 * A class that represents a crop style that can be applied to image components. You can't set the size of an image or resize it, but you can crop the image.
 * @param props Props to build the ImageCropStyle.
 * @returns ImageCropStyle object.
 */
export const ImageCropStyle: uiFC<
  GoogleAppsScript.Card_Service.ImageCropStyle,
  ImageCropStyleProps
> = (props) => {
  const item = CardService.newImageCropStyle();

  if (props.aspectRatio) item.setAspectRatio(props.aspectRatio);
  if (props.type) item.setImageCropType(props.type);

  return item;
};

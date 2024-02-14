import {
  FC,
  GridItemLayout,
  HorizontalAlignment,
  ImageCropType,
} from "../types";
import { ColorRGB, ImageBase64, UrlString } from "../types";
import {
  enumGridItemLayout,
  enumHorizontalAlignment,
  enumImageCropType,
  getArray,
  ifDef,
} from "../utils";
import { ActionTargetProps, withAction } from "./action-target-utils";

function border(
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

export type GridProps = {
  /** Sets the title text of the grid. The text must be a plain string with no formatting. */
  title: string;
  /** GridItems of the grid. */
  items?: GoogleAppsScript.Card_Service.GridItem[];
  /** Sets the border style applied to each grid item. Default is NO_BORDER. */
  border?: {
    /** The color in #RGB format to be applied to the border. */
    color: ColorRGB;
    /** The corner radius to be applied to the border. */
    radius?: number;
  };
  /** The number of columns to display in the grid. If shown in the right side panel, you can display 1-2 columns and the default value is 1. If shown in a dialog, you can display 2-3 columns and the default value is 2. */
  columnsCount?: number;

  children?:
    | GoogleAppsScript.Card_Service.GridItem
    | GoogleAppsScript.Card_Service.GridItem[];
} & ActionTargetProps;

/**
 * An organized grid to display a collection of grid items.
 * @param props Props to build the Grid.
 * @returns Grid object.
 */
export const Grid: FC<GoogleAppsScript.Card_Service.Grid, GridProps> = (
  props
) => {
  const cmp = CardService.newGrid();

  ifDef(props.title, cmp.setTitle);
  ifDef(props.border, (b) =>
    cmp.setBorderStyle(border(b.color, b.radius, CardService.BorderType.STROKE))
  );
  ifDef(props.columnsCount, cmp.setNumColumns);

  ifDef(props.items, (i) => i.forEach((p) => cmp.addItem(p)));
  getArray(props.children).forEach((p) => cmp.addItem(p));

  withAction(cmp, props);

  return cmp;
};

export function getClickedItemId(
  e: GoogleAppsScript.Addons.EventObject
): string {
  return e.commonEventObject.parameters["grid_item_identifier"];
}

export type GridItemProps = {
  /** Sets the identifier for the grid item. When a user clicks this grid item, this ID is returned in the parent grid's on_click call back parameters. */
  id: string;
  /** Sets the title text of the grid item. */
  title: string;
  /** Sets the subtitle of the grid item. */
  subtitle?: string;
  /** Sets the image for this grid item. */
  image: GoogleAppsScript.Card_Service.ImageComponent;
  /** Sets the layout of text and image for the grid item. Default is TEXT_BELOW */
  layout?: GridItemLayout;
  /** Sets the horizontal alignment of the grid item. Default is START. */
  textAlignment?: HorizontalAlignment;
};

/**
 * The items users interact with within a grid widget.
 * @param props Props to build the GridItem.
 * @returns GridItem object.
 */
export const GridItem: FC<
  GoogleAppsScript.Card_Service.GridItem,
  GridItemProps
> = (props) => {
  const cmp = CardService.newGridItem();

  cmp.setIdentifier(props.id);
  cmp.setTitle(props.title);
  cmp.setImage(props.image);

  ifDef(props.subtitle, cmp.setSubtitle);
  ifDef(props.layout, (l) => cmp.setLayout(enumGridItemLayout(l)));
  ifDef(props.textAlignment, (t) =>
    cmp.setTextAlignment(enumHorizontalAlignment(t))
  );

  return cmp;
};

export type ImageComponentProps = {
  /** Sets the alternative text of the URL which is used for accessibility. */
  altText?: string;
  /** Sets the border style applied to the image. */
  border?: {
    /** The color in #RGB format to be applied to the border. */
    color: ColorRGB;
    /** The corner radius to be applied to the border. */
    radius?: number;
  };
  /** Crop style that can be applied to image components. You can't set the size of an image or resize it, but you can crop the image. */
  crop?: {
    /** Sets the crop type for the image. Default is SQUARE. */
    type: ImageCropType;
    /** Sets the aspect ratio to use if the crop type is RECTANGLE_CUSTOM. The ratio must be a positive value. */
    aspectRatio?: number;
  };
  /** Sets the image to use by providing its URL or data string. */
  url: UrlString | ImageBase64;
};

/**
 * An image component that can be added to grid items.
 * @param props Props to build the ImageComponent.
 * @returns ImageComponent object.
 */
export const ImageComponent: FC<
  GoogleAppsScript.Card_Service.ImageComponent,
  ImageComponentProps
> = (props) => {
  const item = CardService.newImageComponent();

  item.setImageUrl(props.url);

  ifDef(props.altText, item.setAltText);
  ifDef(props.border, (b) =>
    item.setBorderStyle(
      border(b.color, b.radius, CardService.BorderType.STROKE)
    )
  );
  ifDef(props.crop, (crop) => {
    const cs = CardService.newImageCropStyle();

    cs.setImageCropType(enumImageCropType(crop.type));
    ifDef(crop.aspectRatio, cs.setAspectRatio);

    item.setCropStyle(cs);
  });

  return item;
};

export type GridTileTitleProps = { title: string; subtitle?: string };
export type GridTileTitleType = { title: string; subtitle?: string };

export const GridTileTitle: FC<GridTileTitleProps, GridTileTitleType> = (
  props
) => ({ ...props });

export type GridTileProps = {
  /** Sets the identifier for the grid item. When a user clicks this grid item, this ID is returned in the parent grid's on_click call back parameters. */
  id: string;
  /** Sets the horizontal alignment of the grid item. Default is START. */
  textAlignment?: HorizontalAlignment;

  children?: (
    | GoogleAppsScript.Card_Service.ImageComponent
    | GridTileTitleType
  )[];
};

/**
 * The items users interact with within a grid widget.
 * @param props Props to build the GridItem.
 * @returns GridItem object.
 */
export const GridTile: FC<
  GoogleAppsScript.Card_Service.GridItem,
  GridTileProps
> = (props) => {
  const cmp = CardService.newGridItem();

  const children = getArray(props.children);

  const titleIdx = children.findIndex((p) => "title" in p);
  const title = children[titleIdx] as GridTileTitleType;
  const imageIdx = children.findIndex((p) => "setImageUrl" in p);
  const image = children[
    imageIdx
  ] as GoogleAppsScript.Card_Service.ImageComponent;

  cmp.setIdentifier(props.id);
  cmp.setTitle(title.title);
  cmp.setImage(image);

  ifDef(title.subtitle, cmp.setSubtitle);

  if (titleIdx > imageIdx) cmp.setLayout(CardService.GridItemLayout.TEXT_BELOW);
  else cmp.setLayout(CardService.GridItemLayout.TEXT_ABOVE);

  ifDef(props.textAlignment, (t) =>
    cmp.setTextAlignment(enumHorizontalAlignment(t))
  );

  return cmp;
};

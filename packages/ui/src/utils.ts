import {
  ActionBuilder,
  ActionPropType,
  ActionProvider,
  RoutedAction,
} from "./actions-router";
import {
  BorderType,
  ComposedEmailType,
  ContentType,
  DisplayStyle,
  GridItemLayout,
  HorizontalAlignment,
  Icon,
  ImageCropType,
  ImageStyle,
  LoadIndicator,
  OnClose,
  OpenAs,
  ResponseComponent,
  SelectionInputType,
  SwitchControlType,
  TextButtonStyle,
  UpdateDraftBodyType,
} from "./types";

export function fnName(fn: (...args: any[]) => any) {
  //TODO: check it is in the global scope
  if (!fn) throw new Error("Null functions not allowed");
  if (fn.name === "") throw new Error("Anonymous functions not allowed");

  return fn.name;
}

export function buildAction<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
>(p: ActionPropType<T, E>): RoutedAction<T, E> {
  if (typeof p === "function") {
    if (p.__type__ === "action-builder") return p()() as RoutedAction<T, E>;
    else return p() as RoutedAction<T, E>;
  } else return p;
}

export function buildActionSetter<
  T extends ResponseComponent,
  E extends GoogleAppsScript.Addons.EventObject
>(fn: (arg: GoogleAppsScript.Card_Service.Action) => void) {
  return (p: RoutedAction<T, E> | ActionBuilder<T, E> | ActionProvider<T, E>) =>
    fn(buildAction(p));
}

export function getArray<T>(value: T | T[]): T[] {
  return value === null || value === undefined
    ? []
    : Array.isArray(value)
    ? value
    : [value];
}

export function ifDef<T>(
  value: T,
  fn: (value: T) => void,
  elseFn?: () => void
) {
  if (value !== undefined) fn(value);
  else if (elseFn !== undefined) elseFn();
}

export function enumBorderType(
  value: BorderType
): GoogleAppsScript.Card_Service.BorderType {
  if (value === "stroke") return CardService.BorderType.STROKE;
  else if (value === "none") return CardService.BorderType.NO_BORDER;
  else throw new Error(`Unknown BorderType "${value}"`);
}

export function enumComposedEmailType(
  value: ComposedEmailType
): GoogleAppsScript.Card_Service.ComposedEmailType {
  if (value === "reply") return CardService.ComposedEmailType.REPLY_AS_DRAFT;
  else if (value === "standalone")
    return CardService.ComposedEmailType.STANDALONE_DRAFT;
  else throw new Error(`Unknown ComposedEmailType "${value}"`);
}

export function enumContentType(
  value: ContentType
): GoogleAppsScript.Card_Service.ContentType {
  if (value === "text") return CardService.ContentType.TEXT;
  else if (value === "html") return CardService.ContentType.MUTABLE_HTML;
  else if (value === "readonly-html")
    return CardService.ContentType.IMMUTABLE_HTML;
  else throw new Error(`Unknown ContentType "${value}"`);
}

export function enumDisplayStyle(
  value: DisplayStyle
): GoogleAppsScript.Card_Service.DisplayStyle {
  if (value === "peek") return CardService.DisplayStyle.PEEK;
  else if (value === "replace") return CardService.DisplayStyle.REPLACE;
  else throw new Error(`Unknown DisplayStyle "${value}"`);
}

export function enumGridItemLayout(
  value: GridItemLayout
): GoogleAppsScript.Card_Service.GridItemLayout {
  if (value === "text-below") return CardService.GridItemLayout.TEXT_BELOW;
  else if (value === "text-above") return CardService.GridItemLayout.TEXT_ABOVE;
  else throw new Error(`Unknown GridItemLayout "${value}"`);
}

export function enumHorizontalAlignment(
  value: HorizontalAlignment
): GoogleAppsScript.Card_Service.HorizontalAlignment {
  if (value === "start") return CardService.HorizontalAlignment.START;
  else if (value === "center") return CardService.HorizontalAlignment.CENTER;
  else if (value === "end") return CardService.HorizontalAlignment.END;
  else throw new Error(`Unknown HorizontalAlignment "${value}"`);
}

export function enumIcon(value: Icon): GoogleAppsScript.Card_Service.Icon {
  if (value === "none") return CardService.Icon.NONE;
  else if (value === "airplane") return CardService.Icon.AIRPLANE;
  else if (value === "bookmark") return CardService.Icon.BOOKMARK;
  else if (value === "bus") return CardService.Icon.BUS;
  else if (value === "car") return CardService.Icon.CAR;
  else if (value === "clock") return CardService.Icon.CLOCK;
  else if (value === "confirmation-number")
    return CardService.Icon.CONFIRMATION_NUMBER_ICON;
  else if (value === "dollar") return CardService.Icon.DOLLAR;
  else if (value === "description") return CardService.Icon.DESCRIPTION;
  else if (value === "email") return CardService.Icon.EMAIL;
  else if (value === "event-performer") return CardService.Icon.EVENT_PERFORMER;
  else if (value === "event-seat") return CardService.Icon.EVENT_SEAT;
  else if (value === "flight-arrival") return CardService.Icon.FLIGHT_ARRIVAL;
  else if (value === "flight-departure")
    return CardService.Icon.FLIGHT_DEPARTURE;
  else if (value === "hotel") return CardService.Icon.HOTEL;
  else if (value === "hotel-room-type") return CardService.Icon.HOTEL_ROOM_TYPE;
  else if (value === "invite") return CardService.Icon.INVITE;
  else if (value === "map-pin") return CardService.Icon.MAP_PIN;
  else if (value === "membership") return CardService.Icon.MEMBERSHIP;
  else if (value === "people") return CardService.Icon.MULTIPLE_PEOPLE;
  else if (value === "offer") return CardService.Icon.OFFER;
  else if (value === "person") return CardService.Icon.PERSON;
  else if (value === "phone") return CardService.Icon.PHONE;
  else if (value === "restaurant") return CardService.Icon.RESTAURANT_ICON;
  else if (value === "shopping-cart") return CardService.Icon.SHOPPING_CART;
  else if (value === "star") return CardService.Icon.STAR;
  else if (value === "store") return CardService.Icon.STORE;
  else if (value === "ticket") return CardService.Icon.TICKET;
  else if (value === "train") return CardService.Icon.TRAIN;
  else if (value === "camera") return CardService.Icon.VIDEO_CAMERA;
  else if (value === "play") return CardService.Icon.VIDEO_PLAY;
  else throw new Error(`Unknown Icon "${value}"`);
}

export function enumImageCropType(
  value: ImageCropType
): GoogleAppsScript.Card_Service.ImageCropType {
  if (value === "square") return CardService.ImageCropType.SQUARE;
  else if (value === "circle") return CardService.ImageCropType.CIRCLE;
  else if (value === "rectangle")
    return CardService.ImageCropType.RECTANGLE_CUSTOM;
  else if (value === "4-3") return CardService.ImageCropType.RECTANGLE_4_3;
  else throw new Error(`Unknown ImageCropType "${value}"`);
}

export function enumImageStyle(
  value: ImageStyle
): GoogleAppsScript.Card_Service.ImageStyle {
  if (value === "square") return CardService.ImageStyle.SQUARE;
  else if (value === "circle") return CardService.ImageStyle.CIRCLE;
  else throw new Error(`Unknown ImageStyle "${value}"`);
}

export function enumLoadIndicator(
  value: LoadIndicator
): GoogleAppsScript.Card_Service.LoadIndicator {
  if (value === "spinner") return CardService.LoadIndicator.SPINNER;
  else if (value === "none") return CardService.LoadIndicator.NONE;
  else throw new Error(`Unknown LoadIndicator "${value}"`);
}

export function enumOnClose(
  value: OnClose
): GoogleAppsScript.Card_Service.OnClose {
  if (value === "nothing") return CardService.OnClose.NOTHING;
  else if (value === "reload") return CardService.OnClose.RELOAD;
  else if (value === "reload-addon") return CardService.OnClose.RELOAD_ADD_ON;
  else throw new Error(`Unknown OnClose "${value}"`);
}

export function enumOpenAs(
  value: OpenAs
): GoogleAppsScript.Card_Service.OpenAs {
  if (value === "full-size") return CardService.OpenAs.FULL_SIZE;
  else if (value === "overlay") return CardService.OpenAs.OVERLAY;
  else throw new Error(`Unknown OpenAs "${value}"`);
}

export function enumSelectionInputType(
  value: SelectionInputType
): GoogleAppsScript.Card_Service.SelectionInputType {
  if (value === "checkbox") return CardService.SelectionInputType.CHECK_BOX;
  else if (value === "radio")
    return CardService.SelectionInputType.RADIO_BUTTON;
  else if (value === "dropdown") return CardService.SelectionInputType.DROPDOWN;
  else throw new Error(`Unknown SelectionInputType "${value}"`);
}

export function enumSwitchControlType(
  value: SwitchControlType
): GoogleAppsScript.Card_Service.SwitchControlType {
  if (value === "switch") return CardService.SwitchControlType.SWITCH;
  else if (value === "checkbox") return CardService.SwitchControlType.CHECK_BOX;
  else throw new Error(`Unknown SwitchControlType "${value}"`);
}

export function enumTextButtonStyle(
  value: TextButtonStyle
): GoogleAppsScript.Card_Service.TextButtonStyle {
  if (value === "text") return CardService.TextButtonStyle.TEXT;
  else if (value === "filled") return CardService.TextButtonStyle.FILLED;
  else throw new Error(`Unknown TextButtonStyle "${value}"`);
}

export function enumUpdateDraftBodyType(
  value: UpdateDraftBodyType
): GoogleAppsScript.Card_Service.UpdateDraftBodyType {
  if (value === "inplace-insert")
    return CardService.UpdateDraftBodyType.IN_PLACE_INSERT;
  else throw new Error(`Unknown UpdateDraftBodyType "${value}"`);
}

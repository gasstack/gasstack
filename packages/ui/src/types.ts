export type ResourceComponent =
  | GoogleAppsScript.Card_Service.Attachment
  | GoogleAppsScript.Card_Service.Suggestions
  | GoogleAppsScript.Card_Service.AuthorizationException;

export type ButtonComponent =
  | GoogleAppsScript.Card_Service.Button
  | GoogleAppsScript.Card_Service.Image
  | GoogleAppsScript.Card_Service.ImageButton
  | GoogleAppsScript.Card_Service.TextButton;

export type LayoutComponent =
  | GoogleAppsScript.Card_Service.ButtonSet
  | GoogleAppsScript.Card_Service.Card
  | GoogleAppsScript.Card_Service.CardHeader
  | GoogleAppsScript.Card_Service.CardSection
  | GoogleAppsScript.Card_Service.Divider
  | GoogleAppsScript.Card_Service.FixedFooter
  | GoogleAppsScript.Card_Service.Grid
  | GoogleAppsScript.Card_Service.GridItem;

export type StyleComponent =
  | GoogleAppsScript.Card_Service.BorderStyle
  | GoogleAppsScript.Card_Service.ImageCropStyle;

export type DisplayComponent =
  | GoogleAppsScript.Card_Service.IconImage
  | GoogleAppsScript.Card_Service.ImageComponent
  | GoogleAppsScript.Card_Service.TextParagraph
  | GoogleAppsScript.Card_Service.DecoratedText;

export type InputComponent =
  | GoogleAppsScript.Card_Service.DatePicker
  | GoogleAppsScript.Card_Service.DateTimePicker
  | GoogleAppsScript.Card_Service.SelectionInput
  | GoogleAppsScript.Card_Service.Switch
  | GoogleAppsScript.Card_Service.TextInput
  | GoogleAppsScript.Card_Service.TimePicker;

export type EffectComponent =
  | GoogleAppsScript.Card_Service.Navigation
  | GoogleAppsScript.Card_Service.Notification
  | GoogleAppsScript.Card_Service.OpenLink;

export type ActionComponent =
  | GoogleAppsScript.Card_Service.Action
  | GoogleAppsScript.Card_Service.AuthorizationAction
  | GoogleAppsScript.Card_Service.CardAction
  | GoogleAppsScript.Card_Service.UpdateDraftBccRecipientsAction
  | GoogleAppsScript.Card_Service.UpdateDraftBodyAction
  | GoogleAppsScript.Card_Service.UpdateDraftCcRecipientsAction
  | GoogleAppsScript.Card_Service.UpdateDraftSubjectAction
  | GoogleAppsScript.Card_Service.UpdateDraftToRecipientsAction;

export type ResponseComponent =
  | GoogleAppsScript.Card_Service.ActionResponse
  | GoogleAppsScript.Card_Service.CalendarEventActionResponse
  | GoogleAppsScript.Card_Service.ComposeActionResponse
  | GoogleAppsScript.Card_Service.DriveItemsSelectedActionResponse
  | GoogleAppsScript.Card_Service.EditorFileScopeActionResponse
  | GoogleAppsScript.Card_Service.SuggestionsResponse
  | GoogleAppsScript.Card_Service.UniversalActionResponse
  | GoogleAppsScript.Card_Service.UpdateDraftActionResponse;

export type UiEnum =
  | GoogleAppsScript.Card_Service.BorderType
  | GoogleAppsScript.Card_Service.ComposedEmailType
  | GoogleAppsScript.Card_Service.ContentType
  | GoogleAppsScript.Card_Service.DisplayStyle
  | GoogleAppsScript.Card_Service.GridItemLayout
  | GoogleAppsScript.Card_Service.HorizontalAlignment
  | GoogleAppsScript.Card_Service.Icon
  | GoogleAppsScript.Card_Service.ImageCropType
  | GoogleAppsScript.Card_Service.ImageStyle
  | GoogleAppsScript.Card_Service.LoadIndicator
  | GoogleAppsScript.Card_Service.OnClose
  | GoogleAppsScript.Card_Service.OpenAs
  | GoogleAppsScript.Card_Service.SelectionInputType
  | GoogleAppsScript.Card_Service.SwitchControlType
  | GoogleAppsScript.Card_Service.TextButtonStyle
  | GoogleAppsScript.Card_Service.UpdateDraftBodyType;

export type Component =
  | ButtonComponent
  | LayoutComponent
  | DisplayComponent
  | InputComponent;

export type ActionTarget =
  | ButtonComponent
  | GoogleAppsScript.Card_Service.CardAction
  | GoogleAppsScript.Card_Service.DecoratedText
  | GoogleAppsScript.Card_Service.Grid;

export type FC<R extends Component, T = any> = (props: T) => R;
export type ActionFC<R extends ActionComponent, T = any> = (props: T) => R;
export type ResponseFC<R extends ResponseComponent, T = any> = (props: T) => R;
export type EffectFC<R extends EffectComponent, T = any> = (props: T) => R;
export type StyleFC<R extends StyleComponent, T = any> = (props: T) => R;
export type ResourceFC<R extends ResourceComponent, T = any> = (props: T) => R;

export type UrlString = `https://${string}`;
export type EmailString = `${string}@${string}.${string}`;
export type MimeString = `${string}/${string}`;
export type ImageBase64 = `data:image/${string};base64,${string}`;
export type ColorRGB = `#${string}`;

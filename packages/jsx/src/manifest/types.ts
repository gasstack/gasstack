export type ManifestResource = {
  addOns?: AddOnsResource;
  oauthScopes?: OauthScopes[];
  urlFetchWhitelist?: AllowedUrlPrefix[];
};

export type OauthScopes = `https://www.googleapis.com/auth/${string}`;

export type UrlString = `https://${string}`;
export type AllowedUrlPrefix = `${UrlString}/`;

export type AddOnsResource = {
  common: CommonResource;
  calendar?: CalendarResource;
  drive?: DriveResource;
  gmail?: GmailResource;
  docs?: EditorResource;
  sheets?: EditorResource;
  slides?: EditorResource;
};

export type HomepageTrigger = {
  enabled?: boolean;
} & RunFunctionTrigger;

export type HomepageTriggerFn = (
  e: GoogleAppsScript.Addons.EventObject
) => GoogleAppsScript.Card_Service.Card | GoogleAppsScript.Card_Service.Card[];

export type RunFunctionTrigger = {
  runFunction: string;
};

export type AddOnResource = {
  homepageTrigger?: HomepageTrigger;
};

export type CommonResource = AddOnResource & {
  layoutProperties?: LayoutProperties;
  logoUrl: UrlString;
  name: string;
  openLinkUrlPrefixes?: AllowedUrlPrefix[]; //TODO required if OpenLink or text widgets with anchor tags
  universalActions?: UniversalAction[];
  useLocaleFromApp?: boolean;
};

export type LayoutProperties = {
  primaryColor?: string; //TODO css #rrggbb
  secondaryColor?: string;
};

export type UniversalAction = {
  label: string;
} & (
  | {
      openLink: UrlString;
    }
  | RunFunctionTrigger
);

export type UniversalActionFn = (
  e: GoogleAppsScript.Addons.EventObject
) => GoogleAppsScript.Card_Service.UniversalActionResponse | void;

export type CalendarResource = AddOnResource & {
  createSettingsUrlFunction?: string;
  conferenceSolution?: CalendarConferenceSolution[];
  currentEventAccess?: CurrentcalendarEventAccess;
  eventOpenTrigger?: RunFunctionTrigger;
  eventUpdateTrigger?: RunFunctionTrigger;
  eventAttachmentTrigger?: CalendarEventAttachmentTrigger;
};

export type CalendarSettingsUrlFn = () => UrlString;

export type CalendarConferenceSolution = {
  id: string;
  logoUrl: UrlString;
  name: string;
  onCreateFunction: string;
};

export type CalendarCoferenceCreateFn = (p: {
  eventData: GoogleAppsScript.Addons.CalendarEventObject;
}) => GoogleAppsScript.Addons.ConferenceDataObject;

export type CalendarEventFn = (
  e: GoogleAppsScript.Addons.CalendarEventObject
) => GoogleAppsScript.Card_Service.Card[];

export type CurrentcalendarEventAccess =
  | "METADATA"
  | "READ"
  | "WRITE"
  | "READ_WRITE";

export type CalendarEventAttachmentTrigger = {
  label: string;
} & RunFunctionTrigger;

export type DriveResource = AddOnResource & {
  onItemsSelectedTrigger?: RunFunctionTrigger;
};

export type DriveItemsSelectedFn = (
  e: GoogleAppsScript.Addons.DriveEventObject
) => GoogleAppsScript.Card_Service.Card[];

export type GmailResource = AddOnResource & {
  composeTrigger?: GmailComposeTrigger;
  contextualTriggers?: ContextualTrigger[];
};

export type GmailComposeTrigger = {
  draftAccess: DraftAccess;
  selectActions: GmailSelectAction[];
};

export type DraftAccess = "NONE" | "METADATA";

export type GmailSelectAction = {
  text: string;
} & RunFunctionTrigger;

export type GmailSelectActionFn = () =>
  | GoogleAppsScript.Card_Service.Card
  | GoogleAppsScript.Card_Service.Card[];

export type ContextualTrigger = {
  onTriggerFunction: string;
  unconditional: {};
};

export type GmailContextualTriggerFn = (
  e: GoogleAppsScript.Addons.EventObject
) => GoogleAppsScript.Card_Service.Card[];

export type EditorResource = AddOnResource & {
  onFileScopeGrantedTrigger?: RunFunctionTrigger;
  linkPreviewTriggers?: LinkPreviewTriggers[];
  createActionTriggers?: CreateActionTriggers[];
};

export type EditorFileScopeGrantFn = () => GoogleAppsScript.Card_Service.Card[];

export type LinkPreviewTriggers = {
  labelText: string;
  localizedLabelText?: Record<string, string>; //TODO: en-US -> labelText
  logoUrl?: UrlString;
  patterns: UriPattern[];
} & RunFunctionTrigger;

export type LinkPreviewTriggerFn = (
  e: GoogleAppsScript.Addons.EventObject
) => GoogleAppsScript.Card_Service.Card;

export type UriPattern = {
  hostPattern: string; //TODO: *.domain or domain.ddd
  pathPrefix?: string;
};

export type CreateActionTriggers = {
  id: string;
  labelText: string;
  localizedLabelText: Record<string, string>; //TODO: en-US -> labelText
  logoUrl?: UrlString;
} & RunFunctionTrigger;

export type EditorCreateActionFn = () => GoogleAppsScript.Card_Service.Card;

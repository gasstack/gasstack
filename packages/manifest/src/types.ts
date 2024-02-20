export type ManifestResource = {
  exceptionLogging?: LoggingType;
  executionApi?: { access: AccessType };
  sheets?: {
    macros: SheetMacro[];
  };
  webapp?: { access: AccessType; executeAs: ExecuteAsType };
  addOns?: AddOnsResource;
  oauthScopes?: OauthScopes[];
  urlFetchWhitelist?: AllowedUrlPrefix[];
};

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type SheetMacro = {
  menuName: string;
  functionName: string;
  defaultShortcut?: `Ctrl+Alt+Shift+${Digit}`;
};

// https://developers.google.com/identity/protocols/oauth2/scopes#script
// https://developers.google.com/apps-script/add-ons/concepts/workspace-scopes
export type OauthScopesAppScriptKeys =
  | "admin.directory.group"
  | "admin.directory.user"
  | "documents"
  | "drive"
  | "forms"
  | "forms.currentonly"
  | "groups"
  | "script.deployments"
  | "script.deployments.readonly"
  | "script.metrics"
  | "script.processes"
  | "script.projects"
  | "script.projects.readonly"
  | "spreadsheets"
  | "userinfo.email"
  | "script.external_request"
  | "script.locale"
  | "script.scriptapp"
  | "workspace.linkpreview"
  | "workspace.linkcreate";

export type OauthScopesCalendarKeys =
  | "calendar"
  | "calendar.events"
  | "calendar.events.readonly"
  | "calendar.readonly"
  | "calendar.settings.readonly"
  | "calendar.addons.execute"
  | "calendar.addons.current.event.read"
  | "calendar.addons.current.event.write";

export type OauthScopesDriveKeys =
  | "drive"
  | "drive.appdata"
  | "drive.file"
  | "drive.metadata"
  | "drive.metadata.readonl"
  | "drive.photos.readonly"
  | "drive.readonly"
  | "drive.scripts"
  | "drive.activity"
  | "drive.activity.readonly"
  | "drive.addons.metadata.readonly";

export type OauthScopesGmailKeys =
  | "gmail.addons.current.action.compose"
  | "gmail.addons.current.message.action"
  | "gmail.addons.current.message.metadata"
  | "gmail.addons.current.message.readonly"
  | "gmail.compose"
  | "gmail.insert"
  | "gmail.labels"
  | "gmail.metadata"
  | "gmail.modify"
  | "gmail.readonly"
  | "gmail.send"
  | "gmail.settings.basic"
  | "gmail.settings.sharing";

export type OauthScopesDocsKeys =
  | "documents"
  | "documents.readonly"
  | "documents.currentonly";
export type OauthScopesSheetsKeys =
  | "spreadsheets"
  | "spreadsheets.readonly"
  | "spreadsheets.currentonly";
export type OauthScopesSlidesKeys =
  | "presentations"
  | "presentations.readonly"
  | "presentations.currentonly";

export type OauthScopesKeys =
  | OauthScopesAppScriptKeys
  | OauthScopesCalendarKeys
  | OauthScopesDriveKeys
  | OauthScopesGmailKeys
  | OauthScopesDocsKeys
  | OauthScopesSheetsKeys
  | OauthScopesSlidesKeys;

export type OauthScopes = `https://www.googleapis.com/auth/${OauthScopesKeys}`;

export type UrlString = `https://${string}`;
export type AllowedUrlPrefix = `${UrlString}/`;

export type LoggingType = "NONE" | "STACKDRIVER";
export type AccessType = "MYSELF" | "DOMAIN" | "ANYONE" | "ANYONE_ANONYMOUS";
export type ExecuteAsType = "USER_ACCESSING" | "USER_DEPLOYING";

export type AddOnsResource = {
  common: CommonResource;
  calendar?: CalendarResource;
  drive?: DriveResource;
  gmail?: GmailResource;
  docs?: EditorResource;
  sheets?: EditorResource;
  slides?: EditorResource;
};

export type RunFunctionTrigger = {
  runFunction: string;
};

export type HomepageTrigger = {
  enabled?: boolean;
} & RunFunctionTrigger;

export type HomepageTriggerFn = (
  e: GoogleAppsScript.Addons.EventObject
) => GoogleAppsScript.Card_Service.Card[];

export type AddOnResource = {
  homepageTrigger?: HomepageTrigger;
};

export type CommonResource = AddOnResource & {
  layoutProperties?: LayoutProperties;
  logoUrl: UrlString;
  name: string;
  openLinkUrlPrefixes?: AllowedUrlPrefix[];
  universalActions?: UniversalAction[];
  useLocaleFromApp?: boolean;
};

export type LayoutProperties = {
  primaryColor?: string;
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
  currentEventAccess?: CurrentCalendarEventAccess;
  eventOpenTrigger?: RunFunctionTrigger;
  eventUpdateTrigger?: RunFunctionTrigger;
  eventAttachmentTrigger?: CalendarEventAttachmentTrigger;
};

export type CalendarSettingsUrlFn = () => UrlString;

export type CalendarConferenceSolution = {
  id: string;
  logoUrl?: UrlString;
  name: string;
  onCreateFunction: string;
};

export type CalendarCoferenceCreateFn = (p: {
  eventData: GoogleAppsScript.Addons.CalendarEventObject;
}) => GoogleAppsScript.Addons.ConferenceDataObject;

export type CalendarEventFn = (
  e: GoogleAppsScript.Addons.CalendarEventObject
) => GoogleAppsScript.Card_Service.Card[];

export type CurrentCalendarEventAccess =
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
  draftAccess?: GmailDraftAccess;
  selectActions: GmailSelectAction[];
};

export type GmailDraftAccess = "NONE" | "METADATA";

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
  linkPreviewTriggers?: EditorLinkPreviewTriggers[];
  createActionTriggers?: EditorCreateActionTriggers[];
};

export type EditorFileScopeGrantFn = () => GoogleAppsScript.Card_Service.Card[];

export type EditorLinkPreviewTriggers = {
  labelText: string;
  localizedLabelText?: Record<string, string>;
  logoUrl?: UrlString;
  patterns: UriPattern[];
} & RunFunctionTrigger;

export type LinkPreviewTriggerFn = (
  e: GoogleAppsScript.Addons.EventObject
) => GoogleAppsScript.Card_Service.Card;

export type UriPattern = {
  hostPattern: string;
  pathPrefix?: string;
};

export type EditorCreateActionTriggers = {
  id: string;
  labelText: string;
  localizedLabelText?: Record<string, string>; //TODO: en-US -> labelText
  logoUrl?: UrlString;
} & RunFunctionTrigger;

export type EditorCreateActionFn = () => GoogleAppsScript.Card_Service.Card;

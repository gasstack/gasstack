import {
  AllowedUrlPrefix,
  HomepageTriggerFn,
  UrlString,
  UniversalActionFn,
  CalendarSettingsUrlFn,
  CalendarCoferenceCreateFn,
  CurrentCalendarEventAccess,
  CalendarEventFn,
  DriveItemsSelectedFn,
  GmailDraftAccess,
  GmailSelectActionFn,
  GmailContextualTriggerFn,
  EditorFileScopeGrantFn,
  LinkPreviewTriggerFn,
  EditorCreateActionFn,
  OauthScopesKeys,
  LoggingType,
  AccessType,
  ExecuteAsType,
  Digit,
} from "./types";

export type Builder<
  T extends { build: (...a: any) => any } & Record<string, (...p: any) => any>,
  K extends keyof T = Exclude<keyof T, "build">
> = {
  [P in K]: (...a: Parameters<T[P]>) => Builder<T, Exclude<K, P | "build">>;
} & { build: T["build"] };

export type Fluent<
  T extends Record<string, (...p: any) => any>,
  K extends keyof T = keyof T
> = {
  [P in K]: Exclude<K, P> extends never
    ? (...a: Parameters<T[P]>) => void
    : (...a: Parameters<T[P]>) => Fluent<T, Exclude<K, P>>;
};

export type ManifestBuilder = {
  /**
   * The location where exceptions are logged.
   * @param value Settings.
   */
  withLogging(value: LoggingType): ManifestBuilder;
  /**
   * The script project's API executable configuration. This is only used if the project is deployed for API execution.
   * @param access Configuration
   */
  withExecutionApi(access: AccessType): ManifestBuilder;
  /**
   * The resource configuration that defines Sheets macros.
   * @param conf Configuration of the macro comprising the name in the macro's menu, the function to be invoked and the optional keyboard shortcut.
   */
  withSheetsMacro(conf: (p: SheetsMacroBuilder) => void): ManifestBuilder;
  /**
   * The script project's web app configuration, which is only used if the project is deployed as a web app.
   * @param access Access configuration.
   * @param executeAs Execution configuration.
   */
  withWebApp(access: AccessType, executeAs: ExecuteAsType): ManifestBuilder;
  /**
   * The resource configuration of the project if deployed as a Google Workspace Add-on.
   * @param name The name of the add-on shown in the toolbar.
   * @param logoUrl The URL of the image shown in the toolbar. The URL must be public.
   * @param homepage The default trigger function specification for creating the add-on homepage.
   * @param conf Helper to build the specific sub sections.
   */
  withAddOn(
    name: string,
    logoUrl: UrlString,
    homepage: HomepageTriggerFn,
    conf?: (p: Fluent<AddOnBuilder>) => void
  ): ManifestBuilder;
  /**
   * The definition of authorization scopes used by the script project.
   * @param conf Helper to set specific feature-related scopes.
   */
  withScopes(conf: (p: Fluent<OauthScopesBuilder>) => void): ManifestBuilder;
  /**
   * A list of HTTPS URL prefixes. If present, any URL endpoint fetched must match one of the prefixes in this list.
   * @param urls Url prefixes allowed.
   */
  withUrlFetchWhitelist(...urls: AllowedUrlPrefix[]): ManifestBuilder;
};

export type OauthScopesBuilder = {
  /**
   * Add scopes enablig UrlFetch.
   */
  withUrlFetch(): OauthScopesBuilder;
  /**
   * Add scopes enablig programmatic triggers creation and manipulation.
   */
  withTriggerManagement(): OauthScopesBuilder;
  /**
   * Adds scopes granted to the addon.
   * @param scopes List of scopes keys (name of the scope without the common base url).
   */
  withScopes(...scopes: OauthScopesKeys[]): OauthScopesBuilder;
};

export type SheetsMacroBuilder = {
  add(
    menuName: string,
    fn: () => void,
    shortcutNumber?: Digit
  ): SheetsMacroBuilder;
};

export type ShortcutBuilder = {
  Ctrl(): ShortcutBuilder;
  Shift(): ShortcutBuilder;
  Alt(): ShortcutBuilder;
  Char(value: string): ShortcutBuilder;
};

export type AddOnBuilder = {
  /**
   * A configuration that controls the Google Workspace add-on toolbar and button colors and appearance.
   * @param primaryColor The color of toolbar. Defaults to grey (#424242).
   * @param secondaryColor The default color of buttons. Defaults to the primary color (if it is set); otherwise defaults to blue (#2196F3).
   */
  theme(primaryColor: string, secondaryColor?: string): AddOnBuilder;
  /**
   * If true, add-on event objects passed to action callback functions or trigger functions include the locale and timezone information of the user. Defaults to false.
   * @param value
   */
  useLocaleFromApp(value?: boolean): AddOnBuilder;
  /**
   * A list of HTTPS URL prefixes. To protect user data, any link rendered by the add-on must match one of the prefixes in this list.
   * @param prefixes List of urls.
   */
  withUrlPrefixes(...prefixes: AllowedUrlPrefix[]): AddOnBuilder;
  /**
   * List of universal actions that are always available in the add-on UI.
   * @param conf Helper to configure actions.
   */
  withActions(conf: (p: UniversalActionBuilder) => void): AddOnBuilder;

  /**
   * Configurations for Google Workspace Add-on appearance and behavior within the Google Calendar host application. If this field is omitted, the add-on is disabled in Google Calendar.
   * @param conf Helper to configure the specific section.
   * @param homepage The specific trigger function specification for creating the add-on homepage.
   */
  forCalendar(
    conf?: (p: Fluent<CalendarBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;

  /**
   * Configurations for Google Workspace Add-on appearance and behavior within the Google Drive host application. If this field is omitted, the add-on is disabled in Google Drive.
   * @param onSelected The contextual trigger function specification for item selections in Google Drive.
   * @param homepage The specific trigger function specification for creating the add-on homepage.
   */
  forDrive(
    onSelected?: DriveItemsSelectedFn,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;

  /**
   * Configurations for Google Workspace Add-on appearance and behavior within the Gmail host application. If this field is omitted, the add-on is disabled in Gmail.
   * @param conf Helper to configure the specific section.
   * @param homepage The specific trigger function specification for creating the add-on homepage.
   */
  forGmail(
    conf?: (p: Fluent<GmailBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;

  /**
   * Configurations for the Google Workspace Add-on's appearance and behavior within the Docs host application. If this field is omitted, the add-on is disabled in Docs.
   * @param conf Helper to configure the specific section.
   * @param homepage The specific trigger function specification for creating the add-on homepage.
   */
  forDocs(
    conf?: (p: Fluent<EditorBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;

  /**
   * Configurations for the Google Workspace Add-on's appearance and behavior within the Sheets host application. If this field is omitted, the add-on is disabled in Sheets.
   * @param conf Helper to configure the specific section.
   * @param homepage The specific trigger function specification for creating the add-on homepage.
   */
  forSheets(
    conf?: (p: Fluent<EditorBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;

  /**
   * Configurations for the Google Workspace Add-on's appearance and behavior within the Slides host application. If this field is omitted, the add-on is disabled in Slides.
   * @param conf Helper to configure the specific section.
   * @param homepage The specific trigger function specification for creating the add-on homepage.
   */
  forSlides(
    conf?: (p: Fluent<EditorBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
};

export type UniversalActionBuilder = {
  /**
   * Add configuration for a universal action.
   * @param label The text shown in the UI menu for this action.
   * @param link The URL that is opened in a tab when the user selects this action. It gets added to the allow list too.
   */
  add(label: string, link: UrlString): UniversalActionBuilder;
  /**
   * Add configuration for a universal action.
   * @param label The text shown in the UI menu for this action.
   * @param fn The name of the Apps Script function that executes when the user selects this action.
   */
  add(label: string, fn: UniversalActionFn): UniversalActionBuilder;
};

export type CalendarBuilder = {
  /**
   * Determines what level of access the add-on has to user-generated data event data. If not provided, no event metadata is passed to the add-on. Adds the required scopes too.
   * @param access Access level.
   */
  withCurrentEventAccess(access: CurrentCalendarEventAccess): CalendarBuilder;
  /**
   * List of conferencing solutions offered by the add-on. Each solution has a corresponding conferencing option presented in the Google Calendar Edit Event UI.
   * @param settings The name of the Apps Script function that generates a URL leading to a settings page for the add-on.
   * @param conf Helper for the specific section.
   */
  withConferenceSolution(
    settings: CalendarSettingsUrlFn,
    conf: (p: ConferenceSolutionBuilder) => void
  ): CalendarBuilder;
  /**
   * A configuration for a contextual trigger that fires when a Google Calendar event is opened by the user.
   * @param fn Function provided.
   */
  onOpen(fn: CalendarEventFn): CalendarBuilder;
  /**
   * A configuration for a contextual trigger that fires when a Google Calendar event is edited and saved by the user.
   * @param fn Function provided.
   */
  onUpdate(fn: CalendarEventFn): CalendarBuilder;
  /**
   * A configuration for a contextual trigger that fires when the user clicks on the add-on attachment provider in the Calendar dropdown menu.
   * @param label The text that will appear in the Calendar dropdown menu which identifies this attachment provider.
   * @param fn Function provided.
   */
  onAttachment(label: string, fn: CalendarEventFn): CalendarBuilder;
};

export type ConferenceSolutionBuilder = {
  /**
   * Adds a conferencing solution.
   * @param name The name of the conferencing solution shown in the Google Calendar UI when a user creates or edits an event.
   * @param createFn The name of the Apps Script function called when Google Calendar attempts to create this type of conference.
   * @param logoUrl A link to the icon representing the solution. The image should be sized to 96 x 96 dp. This cannot be an arbitrary URL—the image must be hosted on Google's infrastructure.
   * @param id An identifier for the conferencing solution. Must be unique in the add-on's set of provided conference solutions. Once an ID is chosen, it shouldn't be changed. Autogenerated if missing.
   */
  add(
    name: string,
    createFn: CalendarCoferenceCreateFn,
    logoUrl?: UrlString,
    id?: string
  ): ConferenceSolutionBuilder;
};

export type GmailBuilder = {
  /**
   * Defines the set of UIs available to the user while composing an email.
   * @param conf Helper for the specific section.
   * @param draftAccess Defines the level of data access available to a compose trigger function.
   */
  onCompose(
    conf: (p: SelectActionBuilder) => void,
    draftAccess?: GmailDraftAccess
  ): GmailBuilder;
  /**
   * A list of triggers that fire when a message is opened in Gmail. When the trigger fires, it executes a specific Apps Script function, usually to create new cards and update the UI.
   * @param conf Helper for the specific section.
   */
  withContextualUIs(conf: (p: ContextualUIBuilder) => void): GmailBuilder;
};

export type SelectActionBuilder = {
  /**
   * Add a selection action to the compose trigger.
   * @param text A short text description of this compose action.
   * @param fn The name of the Apps Script function that executes when this compose action is selected. This compose trigger function builds the add-on compose UI.
   */
  add(text: string, fn: GmailSelectActionFn): SelectActionBuilder;
};

export type ContextualUIBuilder = {
  /**
   * The configuration for a trigger that fires when the user opens a Gmail message and that message satisfies certain criteria.
   * @param fn The name of the Apps Script function that executes when the trigger fires.
   */
  add(fn: GmailContextualTriggerFn): ContextualUIBuilder;
};

export type EditorBuilder = {
  /**
   * A configuration for a contextual trigger that fires when the request file scope dialog using CardService.newEditorFileScopeActionResponseBuilder() .requestFileScopeForActiveDocument().build(); and the user grants drive.file scope authorization.
   * @param fn The name of the function to run if drive.file scope is granted. If specified, you must implement this function to build and return an array of Card objects for display in the add-on UI.
   */
  onFileScopeGrant(fn: EditorFileScopeGrantFn): EditorBuilder;

  /**
   * A list of triggers for previewing links in a Google Docs, Sheets or Slides file.
   * @param conf Helper for the specific section.
   */
  withPreviews(conf: (p: LinkPreviewTriggersBuilder) => void): EditorBuilder;

  /**
   * A list of triggers for creating resources in a third-party service from the @ menu.
   * @param conf Helper for the specific section.
   */
  withCreateActions(conf: (p: CreateActionsBuilder) => void): EditorBuilder;
};

export type LinkPreviewTriggersBuilder = {
  /**
   * The configuration for a trigger that fires when a user types or pastes a link from a third-party or non-Google service into a Docs, Sheets, or Slides file.
   * @param label The text for an example smart chip that prompts users to preview the link, such as
   * @param fn The name of the function to run when the user authorizes the https://www.googleapis.com/auth/workspace.linkpreview scope. If specified, you must implement this function to accept an event object containing EDITOR_NAME.matchedUrl.url as an argument and return a single Card object that displays a link preview in the add-on UI.
   * @param patterns An array of URL patterns that trigger the add-on to preview links.
   * @param logoUrl The icon that displays in the smart chip and preview card. If omitted, the add-on uses its toolbar icon.
   * @param localizedLabels A map of labelText to localize into other languages. Format the language in ISO 639 and country/region in ISO 3166, separated by a hyphen -. For example, en-US. If a user's locale is present in the map's keys, the user sees the localized version of the labelText.
   */
  add(
    label: string,
    fn: LinkPreviewTriggerFn,
    patterns: UrlString[],
    logoUrl?: UrlString,
    localizedLabels?: Record<string, string>
  ): LinkPreviewTriggersBuilder;
};

export type CreateActionsBuilder = {
  /**
   * The configuration for a trigger that fires when a user selects a third-party integration menu item from the Google Docs @ menu.
   * @param label The text that appears in the @ menu, such as Create support case.
   * @param fn The name of the function to run when a user selects an extension point from the @ menu. The function should return a form card with inputs for creating the third-party resource.
   * @param logoUrl The icon that displays in the @ menu. If omitted, the add-on uses its toolbar icon, logoUrl.
   * @param localizedLabels Optional. A map of labelText to localize into other languages. Format the language in ISO 639 and country/region in ISO 3166, separated by a hyphen -. For example, en-US. If a user's locale is present in the map's keys, the user sees the localized version of the labelText.
   */
  add(
    label: string,
    fn: EditorCreateActionFn,
    logoUrl?: UrlString,
    localizedLabels?: Record<string, string>
  ): CreateActionsBuilder;
};

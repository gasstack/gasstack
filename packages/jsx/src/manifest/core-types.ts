import {
  AllowedUrlPrefix,
  HomepageTriggerFn,
  UrlString,
  UniversalActionFn,
  CalendarSettingsUrlFn,
  CalendarCoferenceCreateFn,
  CurrentcalendarEventAccess,
  CalendarEventFn,
  DriveItemsSelectedFn,
  DraftAccess,
  GmailSelectActionFn,
  GmailContextualTriggerFn,
  EditorFileScopeGrantFn,
  LinkPreviewTriggerFn,
  EditorCreateActionFn,
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
  withAddOn(
    name: string,
    logoUrl: UrlString,
    homepage: HomepageTriggerFn,
    conf?: (p: Fluent<AddOnBuilder>) => void
  ): ManifestBuilder;
};

export type AddOnBuilder = {
  theme(primaryColor: string, secondaryColor?: string): AddOnBuilder;
  useLocaleFromApp(value?: boolean): AddOnBuilder;
  withUrlPrefixes(...prefixes: AllowedUrlPrefix[]): AddOnBuilder;
  withActions(conf: (p: UniversalActionBuilder) => void): AddOnBuilder;

  forCalendar(
    conf?: (p: Fluent<CalendarBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
  forDrive(
    onSelected?: DriveItemsSelectedFn,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
  forGmail(
    conf?: (p: Fluent<GmailBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
  forDocs(
    conf?: (p: Fluent<EditorBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
  forSheets(
    conf?: (p: Fluent<EditorBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
  forSlides(
    conf?: (p: Fluent<EditorBuilder>) => void,
    homepage?: HomepageTriggerFn
  ): AddOnBuilder;
};

export type UniversalActionBuilder = {
  add(label: string, link: UrlString): UniversalActionBuilder;
  add(label: string, fn: UniversalActionFn): UniversalActionBuilder;
};

export type CalendarBuilder = {
  withCurrentEventAccess(access: CurrentcalendarEventAccess): CalendarBuilder;
  withConferenceSolution(
    settings: CalendarSettingsUrlFn,
    conf: (p: ConferenceSolutionBuilder) => void
  ): CalendarBuilder;
  onOpen(fn: CalendarEventFn): CalendarBuilder;
  onUpdate(fn: CalendarEventFn): CalendarBuilder;
  onAttachment(label: string, fn: CalendarEventFn): CalendarBuilder;
};

export type ConferenceSolutionBuilder = {
  add(
    name: string,
    createFn: CalendarCoferenceCreateFn,
    logoUrl?: UrlString,
    id?: string
  ): ConferenceSolutionBuilder;
};

export type GmailBuilder = {
  onCompose(
    conf: (p: SelectActionBuilder) => void,
    draftAccess?: DraftAccess
  ): GmailBuilder;
  withContextualUIs(conf: (p: ContextualUIBuilder) => void): GmailBuilder;
};

export type SelectActionBuilder = {
  add(text: string, fn: GmailSelectActionFn): SelectActionBuilder;
};
export type ContextualUIBuilder = {
  add(fn: GmailContextualTriggerFn): ContextualUIBuilder;
};

export type EditorBuilder = {
  onFileScopeGrant(fn: EditorFileScopeGrantFn): EditorBuilder;
  withPreviews(conf: (p: LinkPreviewTriggersBuilder) => void): EditorBuilder;
  withCreateActions(conf: (p: CreateActionsBuilder) => void): EditorBuilder;
};

export type LinkPreviewTriggersBuilder = {
  add(
    label: string,
    fn: LinkPreviewTriggerFn,
    patterns: UrlString[],
    logoUrl?: UrlString,
    localizedLabels?: Record<string, string>
  ): ContextualUIBuilder;
};

export type CreateActionsBuilder = {
  add(
    label: string,
    fn: EditorCreateActionFn,
    logoUrl?: UrlString,
    localizedLabels?: Record<string, string>
  ): ContextualUIBuilder;
};

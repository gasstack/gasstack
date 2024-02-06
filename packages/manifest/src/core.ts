import {
  AddOnBuilder,
  CalendarBuilder,
  ConferenceSolutionBuilder,
  ContextualUIBuilder,
  CreateActionsBuilder,
  EditorBuilder,
  Fluent,
  GmailBuilder,
  LinkPreviewTriggersBuilder,
  ManifestBuilder,
  OauthScopesBuilder,
  SelectActionBuilder,
  UniversalActionBuilder,
} from "./core-types";
import {
  AllowedUrlPrefix,
  CalendarCoferenceCreateFn,
  CalendarConferenceSolution,
  CalendarEventFn,
  CalendarSettingsUrlFn,
  EditorCreateActionTriggers,
  CurrentCalendarEventAccess,
  GmailDraftAccess,
  DriveItemsSelectedFn,
  EditorCreateActionFn,
  EditorFileScopeGrantFn,
  GmailContextualTriggerFn,
  GmailSelectActionFn,
  HomepageTriggerFn,
  LinkPreviewTriggerFn,
  EditorLinkPreviewTriggers,
  ManifestResource,
  OauthScopes,
  OauthScopesKeys,
  UniversalActionFn,
  UrlString,
} from "./types";

function setOf<T>(items: T[]): T[] {
  return items.reduce((acc, p) => (acc.includes(p) ? acc : [...acc, p]), []);
}

function scopeName(key: OauthScopesKeys): OauthScopes {
  return `https://www.googleapis.com/auth/${key}`;
}

function fnName(fn: (...args: any[]) => any) {
  if (!fn) throw new Error("Null functions not allowed");
  if (fn.name === "") throw new Error("Anonymous functions not allowed");

  return fn.name;
}

function addToOauthScopes(
  manifest: ManifestResource,
  ...keys: OauthScopesKeys[]
) {
  if (!manifest.oauthScopes) manifest.oauthScopes = [];
  manifest.oauthScopes = setOf([
    ...manifest.oauthScopes,
    ...keys.map((p) => scopeName(p)),
  ]);
}

function addToFetchUrlWhitelist(
  manifest: ManifestResource,
  ...urls: AllowedUrlPrefix[]
) {
  if (!manifest.urlFetchWhitelist) manifest.urlFetchWhitelist = [];
  manifest.urlFetchWhitelist = setOf([...manifest.urlFetchWhitelist, ...urls]);
}

function createActionsBuilder(
  manifest: ManifestResource,
  editor: "docs" | "sheets" | "slides"
): CreateActionsBuilder {
  return {
    add(
      label: string,
      fn: EditorCreateActionFn,
      logoUrl?: UrlString,
      localizedLabels?: Record<string, string>
    ) {
      const item: EditorCreateActionTriggers = {
        id: `CreateActionTrigger-${editor}-${manifest.addOns[editor].createActionTriggers.length}`,
        labelText: label,
        runFunction: fnName(fn),
      };
      if (logoUrl) item.logoUrl = logoUrl;
      if (localizedLabels) item.localizedLabelText = localizedLabels;
      manifest.addOns[editor].createActionTriggers.push(item);
      return this;
    },
  };
}

function linkPreviewTriggersBuilder(
  manifest: ManifestResource,
  editor: "docs" | "sheets" | "slides"
): LinkPreviewTriggersBuilder {
  return {
    add(
      label: string,
      fn: LinkPreviewTriggerFn,
      patterns: UrlString[],
      logoUrl?: UrlString,
      localizedLabels?: Record<string, string>
    ) {
      const item: EditorLinkPreviewTriggers = {
        labelText: label,
        patterns: patterns
          .map((p) => /^https:\/\/([^\/]+)(\/.+)?$/.exec(p))
          .map(([_, host, path]) => ({ hostPattern: host, pathPrefix: path })), //TODO: verify docs
        runFunction: fnName(fn),
      };
      if (logoUrl) item.logoUrl = logoUrl;
      if (localizedLabels) item.localizedLabelText = localizedLabels;
      manifest.addOns[editor].linkPreviewTriggers.push(item);

      addToFetchUrlWhitelist(
        manifest,
        ...patterns.map((p: any) => (p.endsWith("/") ? p : `${p}/`))
      );

      return this;
    },
  };
}

function editorBuilder(
  manifest: ManifestResource,
  editor: "docs" | "sheets" | "slides"
): EditorBuilder {
  return {
    onFileScopeGrant(fn: EditorFileScopeGrantFn) {
      manifest.addOns[editor].onFileScopeGrantedTrigger = {
        runFunction: fnName(fn),
      };
      return this;
    },
    withPreviews(conf: (p: LinkPreviewTriggersBuilder) => void) {
      manifest.addOns[editor].linkPreviewTriggers = [];
      conf(linkPreviewTriggersBuilder(manifest, editor));
      addToOauthScopes(manifest, "workspace.linkpreview");
      return this;
    },
    withCreateActions(conf: (p: CreateActionsBuilder) => void) {
      manifest.addOns[editor].createActionTriggers = [];
      conf(createActionsBuilder(manifest, editor));
      addToOauthScopes(manifest, "workspace.linkcreate");
      return this;
    },
  };
}

function contextualUIBuilder(manifest: ManifestResource): ContextualUIBuilder {
  return {
    add(fn: GmailContextualTriggerFn) {
      manifest.addOns.gmail.contextualTriggers.push({
        unconditional: {},
        onTriggerFunction: fnName(fn),
      });
      return this;
    },
  };
}

function selectionActionBuilder(
  manifest: ManifestResource
): SelectActionBuilder {
  return {
    add(text: string, fn: GmailSelectActionFn) {
      manifest.addOns.gmail.composeTrigger.selectActions.push({
        text,
        runFunction: fnName(fn),
      });
      return this;
    },
  };
}

function gmailBuilder(manifest: ManifestResource): GmailBuilder {
  return {
    onCompose(
      conf: (p: SelectActionBuilder) => void,
      draftAccess?: GmailDraftAccess
    ) {
      manifest.addOns.gmail.composeTrigger = { selectActions: [] };
      if (draftAccess)
        manifest.addOns.gmail.composeTrigger.draftAccess = draftAccess;

      if (draftAccess == "METADATA")
        addToOauthScopes(manifest, "gmail.addons.current.message.metadata");

      conf(selectionActionBuilder(manifest));
      return this;
    },
    withContextualUIs(conf: (p: ContextualUIBuilder) => void) {
      manifest.addOns.gmail.contextualTriggers = [];
      conf(contextualUIBuilder(manifest));
      return this;
    },
  };
}

function conferenceSolutionBuilder(
  manifest: ManifestResource
): ConferenceSolutionBuilder {
  return {
    add(
      name: string,
      createFn: CalendarCoferenceCreateFn,
      logoUrl?: UrlString,
      id?: string
    ) {
      if (!manifest.addOns.calendar.conferenceSolution)
        manifest.addOns.calendar.conferenceSolution = [];
      const item: CalendarConferenceSolution = {
        id:
          id ??
          `ConferenceSolution-${manifest.addOns.calendar.conferenceSolution.length}`,
        name,
        onCreateFunction: fnName(createFn),
      };

      if (logoUrl) item.logoUrl = logoUrl;

      manifest.addOns.calendar.conferenceSolution.push(item);
      return this;
    },
  };
}

function calendarBuilder(manifest: ManifestResource): CalendarBuilder {
  return {
    withCurrentEventAccess(access: CurrentCalendarEventAccess) {
      manifest.addOns.calendar.currentEventAccess = access;

      if (access == "READ" || access == "READ_WRITE")
        addToOauthScopes(manifest, "calendar.addons.current.event.read");
      if (access == "WRITE" || access == "READ_WRITE")
        addToOauthScopes(manifest, "calendar.addons.current.event.write");

      return this;
    },
    withConferenceSolution(
      settings: CalendarSettingsUrlFn,
      conf: (p: ConferenceSolutionBuilder) => void
    ) {
      manifest.addOns.calendar.createSettingsUrlFunction = fnName(settings);
      conf(conferenceSolutionBuilder(manifest));
      addToOauthScopes(manifest, "workspace.linkcreate");
      return this;
    },
    onOpen(fn: CalendarEventFn) {
      manifest.addOns.calendar.eventOpenTrigger = { runFunction: fnName(fn) };
      return this;
    },
    onUpdate(fn: CalendarEventFn) {
      manifest.addOns.calendar.eventUpdateTrigger = { runFunction: fnName(fn) };
      return this;
    },
    onAttachment(label: string, fn: CalendarEventFn) {
      manifest.addOns.calendar.eventAttachmentTrigger = {
        label,
        runFunction: fnName(fn),
      };
      return this;
    },
  };
}

function universalActionBuilder(
  manifest: ManifestResource
): UniversalActionBuilder {
  return {
    add(label: string, link: UrlString | UniversalActionFn) {
      if (!manifest.addOns.common.universalActions)
        manifest.addOns.common.universalActions = [];

      if (typeof link === "string") {
        manifest.addOns.common.universalActions.push({
          label,
          openLink: link,
        });
        addToFetchUrlWhitelist(manifest, `${link}/`);
      } else {
        manifest.addOns.common.universalActions.push({
          label,
          runFunction: fnName(link),
        });
      }
      return this;
    },
  };
}

function addOnBuilder(manifest: ManifestResource): AddOnBuilder {
  return {
    theme(primaryColor: string, secondaryColor?: string) {
      const colorRegex = /^#[0-9a-fA-F]{6}$/;
      if (colorRegex.test(primaryColor) === false)
        throw new Error(`${primaryColor} is not a valid color.`);
      if (secondaryColor && colorRegex.test(secondaryColor) === false)
        throw new Error(`${secondaryColor} is not a valid color.`);

      manifest.addOns.common.layoutProperties = {
        primaryColor: primaryColor.toLowerCase(),
      };
      if (secondaryColor)
        manifest.addOns.common.layoutProperties.secondaryColor =
          secondaryColor.toLowerCase();
      return this;
    },
    useLocaleFromApp(value: boolean = true) {
      manifest.addOns.common.useLocaleFromApp = value;
      addToOauthScopes(manifest, "script.locale");
      return this;
    },
    withUrlPrefixes(...prefixes: AllowedUrlPrefix[]) {
      manifest.addOns.common.openLinkUrlPrefixes = setOf(prefixes);

      addToFetchUrlWhitelist(manifest, ...prefixes);
      return this;
    },
    withActions(conf: (p: UniversalActionBuilder) => void) {
      conf(universalActionBuilder(manifest));
      return this;
    },

    forCalendar(
      conf?: (p: Fluent<CalendarBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      manifest.addOns.calendar = {};
      if (homepage)
        manifest.addOns.calendar.homepageTrigger = {
          runFunction: fnName(homepage),
        };
      conf?.(calendarBuilder(manifest));
      return this;
    },
    forDrive(onSelected?: DriveItemsSelectedFn, homepage?: HomepageTriggerFn) {
      manifest.addOns.drive = {};
      if (onSelected)
        manifest.addOns.drive.onItemsSelectedTrigger = {
          runFunction: fnName(onSelected),
        };
      if (homepage)
        manifest.addOns.drive.homepageTrigger = {
          runFunction: fnName(homepage),
        };
      return this;
    },
    forGmail(
      conf?: (p: Fluent<GmailBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      manifest.addOns.gmail = {};
      if (homepage)
        manifest.addOns.gmail.homepageTrigger = {
          runFunction: fnName(homepage),
        };
      conf?.(gmailBuilder(manifest));
      return this;
    },
    forDocs(
      conf?: (p: Fluent<EditorBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      manifest.addOns.docs = {};
      if (homepage)
        manifest.addOns.docs.homepageTrigger = {
          runFunction: fnName(homepage),
        };
      conf?.(editorBuilder(manifest, "docs"));
      return this;
    },
    forSheets(
      conf?: (p: Fluent<EditorBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      manifest.addOns.sheets = {};
      if (homepage)
        manifest.addOns.sheets.homepageTrigger = {
          runFunction: fnName(homepage),
        };
      conf?.(editorBuilder(manifest, "sheets"));
      return this;
    },
    forSlides(
      conf?: (p: Fluent<EditorBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      manifest.addOns.slides = {};
      if (homepage)
        manifest.addOns.slides.homepageTrigger = {
          runFunction: fnName(homepage),
        };
      conf?.(editorBuilder(manifest, "slides"));
      return this;
    },
  };
}

function oauthScopesBuilder(manifest: ManifestResource): OauthScopesBuilder {
  return {
    withUrlFetch() {
      addToOauthScopes(manifest, "script.external_request");
      return this;
    },
    withTriggerManagement() {
      addToOauthScopes(manifest, "script.scriptapp");
      return this;
    },
    withScopes(...scopes: OauthScopesKeys[]) {
      addToOauthScopes(manifest, ...scopes);
      return this;
    },
  };
}

function manifestBuilder(manifest: ManifestResource): ManifestBuilder {
  return {
    withAddOn(
      name: string,
      logoUrl: UrlString,
      homepage: HomepageTriggerFn,
      conf?: (p: Fluent<AddOnBuilder>) => void
    ) {
      manifest.addOns = {
        common: {
          name,
          logoUrl,
          homepageTrigger: { runFunction: fnName(homepage) },
        },
      };
      conf?.(addOnBuilder(manifest));
      return this;
    },
    withScopes(conf: (p: Fluent<OauthScopesBuilder>) => void) {
      conf(oauthScopesBuilder(manifest));
      return this;
    },
    withUrlFetchWhitelist(...urls) {
      addToFetchUrlWhitelist(manifest, ...urls);
      return this;
    },
  };
}

export function defineManifest(
  conf: (builder: Fluent<ManifestBuilder>) => void
): ManifestResource {
  const result: ManifestResource = {};

  conf(manifestBuilder(result));

  return result;
}

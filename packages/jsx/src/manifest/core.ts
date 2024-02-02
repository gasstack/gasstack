import {
  AddOnBuilder,
  CalendarBuilder,
  EditorBuilder,
  Fluent,
  GmailBuilder,
  ManifestBuilder,
  UniversalActionBuilder,
} from "./core-types";
import {
  AllowedUrlPrefix,
  DriveItemsSelectedFn,
  HomepageTriggerFn,
  ManifestResource,
  UniversalActionFn,
  UrlString,
} from "./types";

//TODO: check requirements and invariants in values
//TODO: produce scopes also

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
      const colorRegex = /^#[0-9a-f]{6}$/;
      if (colorRegex.test(primaryColor) === false)
        throw new Error(`${primaryColor} is not a valid color.`);
      if (secondaryColor && colorRegex.test(secondaryColor) === false)
        throw new Error(`${secondaryColor} is not a valid color.`);

      manifest.addOns.common.layoutProperties = {
        primaryColor,
        secondaryColor,
      };
      return this;
    },
    useLocaleFromApp(value: boolean = true) {
      manifest.addOns.common.useLocaleFromApp = value;
      return this;
    },
    withUrlPrefixes(...prefixes: AllowedUrlPrefix[]) {
      manifest.addOns.common.openLinkUrlPrefixes = prefixes.reduce(
        (acc, p) => (acc.includes(p) ? acc : [...acc, p]),
        []
      );
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
      return this;
    },
    forDrive(onSelected?: DriveItemsSelectedFn, homepage?: HomepageTriggerFn) {
      return this;
    },
    forGmail(
      conf?: (p: Fluent<GmailBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      return this;
    },
    forDocs(
      conf?: (p: Fluent<EditorBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      return this;
    },
    forSheets(
      conf?: (p: Fluent<EditorBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
      return this;
    },
    forSlides(
      conf?: (p: Fluent<EditorBuilder>) => void,
      homepage?: HomepageTriggerFn
    ) {
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
      conf: (p: Fluent<AddOnBuilder>) => void
    ) {
      manifest.addOns = {
        common: {
          name,
          logoUrl,
          homepageTrigger: { runFunction: fnName(homepage) },
        },
      };
      if (!!conf) conf(addOnBuilder(manifest));
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

function fnName(fn: (...args: any[]) => any) {
  if (fn) throw new Error("Null functions not allowed");
  if (fn.name === "") throw new Error("Anonymous functions not allowed");

  return fn.name;
}

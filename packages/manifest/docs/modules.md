[@gasstack/manifest](README.md) / Exports

# @gasstack/manifest

## Table of contents

### Type Aliases

- [AddOnBuilder](modules.md#addonbuilder)
- [AddOnResource](modules.md#addonresource)
- [AddOnsResource](modules.md#addonsresource)
- [AllowedUrlPrefix](modules.md#allowedurlprefix)
- [Builder](modules.md#builder)
- [CalendarBuilder](modules.md#calendarbuilder)
- [CalendarCoferenceCreateFn](modules.md#calendarcoferencecreatefn)
- [CalendarConferenceSolution](modules.md#calendarconferencesolution)
- [CalendarEventAttachmentTrigger](modules.md#calendareventattachmenttrigger)
- [CalendarEventFn](modules.md#calendareventfn)
- [CalendarResource](modules.md#calendarresource)
- [CalendarSettingsUrlFn](modules.md#calendarsettingsurlfn)
- [ChangeManifestOptions](modules.md#changemanifestoptions)
- [CommonResource](modules.md#commonresource)
- [ConferenceSolutionBuilder](modules.md#conferencesolutionbuilder)
- [ContextualTrigger](modules.md#contextualtrigger)
- [ContextualUIBuilder](modules.md#contextualuibuilder)
- [CreateActionsBuilder](modules.md#createactionsbuilder)
- [CurrentCalendarEventAccess](modules.md#currentcalendareventaccess)
- [DriveItemsSelectedFn](modules.md#driveitemsselectedfn)
- [DriveResource](modules.md#driveresource)
- [EditorBuilder](modules.md#editorbuilder)
- [EditorCreateActionFn](modules.md#editorcreateactionfn)
- [EditorCreateActionTriggers](modules.md#editorcreateactiontriggers)
- [EditorFileScopeGrantFn](modules.md#editorfilescopegrantfn)
- [EditorLinkPreviewTriggers](modules.md#editorlinkpreviewtriggers)
- [EditorResource](modules.md#editorresource)
- [Fluent](modules.md#fluent)
- [GmailBuilder](modules.md#gmailbuilder)
- [GmailComposeTrigger](modules.md#gmailcomposetrigger)
- [GmailContextualTriggerFn](modules.md#gmailcontextualtriggerfn)
- [GmailDraftAccess](modules.md#gmaildraftaccess)
- [GmailResource](modules.md#gmailresource)
- [GmailSelectAction](modules.md#gmailselectaction)
- [GmailSelectActionFn](modules.md#gmailselectactionfn)
- [HomepageTrigger](modules.md#homepagetrigger)
- [HomepageTriggerFn](modules.md#homepagetriggerfn)
- [LayoutProperties](modules.md#layoutproperties)
- [LinkPreviewTriggerFn](modules.md#linkpreviewtriggerfn)
- [LinkPreviewTriggersBuilder](modules.md#linkpreviewtriggersbuilder)
- [ManifestBuilder](modules.md#manifestbuilder)
- [ManifestResource](modules.md#manifestresource)
- [OauthScopes](modules.md#oauthscopes)
- [OauthScopesAppScriptKeys](modules.md#oauthscopesappscriptkeys)
- [OauthScopesBuilder](modules.md#oauthscopesbuilder)
- [OauthScopesCalendarKeys](modules.md#oauthscopescalendarkeys)
- [OauthScopesDocsKeys](modules.md#oauthscopesdocskeys)
- [OauthScopesDriveKeys](modules.md#oauthscopesdrivekeys)
- [OauthScopesGmailKeys](modules.md#oauthscopesgmailkeys)
- [OauthScopesKeys](modules.md#oauthscopeskeys)
- [OauthScopesSheetsKeys](modules.md#oauthscopessheetskeys)
- [OauthScopesSlidesKeys](modules.md#oauthscopesslideskeys)
- [RunFunctionTrigger](modules.md#runfunctiontrigger)
- [SelectActionBuilder](modules.md#selectactionbuilder)
- [UniversalAction](modules.md#universalaction)
- [UniversalActionBuilder](modules.md#universalactionbuilder)
- [UniversalActionFn](modules.md#universalactionfn)
- [UriPattern](modules.md#uripattern)
- [UrlString](modules.md#urlstring)

### Functions

- [defineManifest](modules.md#definemanifest)
- [manifestPligin](modules.md#manifestpligin)

## Type Aliases

### AddOnBuilder

Ƭ **AddOnBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `forCalendar` | (`conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`CalendarBuilder`](modules.md#calendarbuilder), keyof [`CalendarBuilder`](modules.md#calendarbuilder)\>) => `void`, `homepage?`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn)) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `forDocs` | (`conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`EditorBuilder`](modules.md#editorbuilder), keyof [`EditorBuilder`](modules.md#editorbuilder)\>) => `void`, `homepage?`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn)) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `forDrive` | (`onSelected?`: [`DriveItemsSelectedFn`](modules.md#driveitemsselectedfn), `homepage?`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn)) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `forGmail` | (`conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`GmailBuilder`](modules.md#gmailbuilder), keyof [`GmailBuilder`](modules.md#gmailbuilder)\>) => `void`, `homepage?`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn)) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `forSheets` | (`conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`EditorBuilder`](modules.md#editorbuilder), keyof [`EditorBuilder`](modules.md#editorbuilder)\>) => `void`, `homepage?`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn)) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `forSlides` | (`conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`EditorBuilder`](modules.md#editorbuilder), keyof [`EditorBuilder`](modules.md#editorbuilder)\>) => `void`, `homepage?`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn)) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `theme` | (`primaryColor`: `string`, `secondaryColor?`: `string`) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `useLocaleFromApp` | (`value?`: `boolean`) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `withActions` | (`conf`: (`p`: [`UniversalActionBuilder`](modules.md#universalactionbuilder)) => `void`) => [`AddOnBuilder`](modules.md#addonbuilder) |
| `withUrlPrefixes` | (...`prefixes`: \`https://$\{string}/\`[]) => [`AddOnBuilder`](modules.md#addonbuilder) |

#### Defined in

[src/core-types.ts:78](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L78)

___

### AddOnResource

Ƭ **AddOnResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `homepageTrigger?` | [`HomepageTrigger`](modules.md#homepagetrigger) |

#### Defined in

[src/types.ts:118](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L118)

___

### AddOnsResource

Ƭ **AddOnsResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `calendar?` | [`CalendarResource`](modules.md#calendarresource) |
| `common` | [`CommonResource`](modules.md#commonresource) |
| `docs?` | [`EditorResource`](modules.md#editorresource) |
| `drive?` | [`DriveResource`](modules.md#driveresource) |
| `gmail?` | [`GmailResource`](modules.md#gmailresource) |
| `sheets?` | [`EditorResource`](modules.md#editorresource) |
| `slides?` | [`EditorResource`](modules.md#editorresource) |

#### Defined in

[src/types.ts:96](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L96)

___

### AllowedUrlPrefix

Ƭ **AllowedUrlPrefix**: \`$\{UrlString}/\`

#### Defined in

[src/types.ts:94](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L94)

___

### Builder

Ƭ **Builder**\<`T`, `K`\>: \{ [P in K]: Function } & \{ `build`: `T`[``"build"``]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends \{ `build`: (...`a`: `any`) => `any`  } & `Record`\<`string`, (...`p`: `any`) => `any`\> |
| `K` | extends keyof `T` = `Exclude`\<keyof `T`, ``"build"``\> |

#### Defined in

[src/core-types.ts:20](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L20)

___

### CalendarBuilder

Ƭ **CalendarBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onAttachment` | (`label`: `string`, `fn`: [`CalendarEventFn`](modules.md#calendareventfn)) => [`CalendarBuilder`](modules.md#calendarbuilder) |
| `onOpen` | (`fn`: [`CalendarEventFn`](modules.md#calendareventfn)) => [`CalendarBuilder`](modules.md#calendarbuilder) |
| `onUpdate` | (`fn`: [`CalendarEventFn`](modules.md#calendareventfn)) => [`CalendarBuilder`](modules.md#calendarbuilder) |
| `withConferenceSolution` | (`settings`: [`CalendarSettingsUrlFn`](modules.md#calendarsettingsurlfn), `conf`: (`p`: [`ConferenceSolutionBuilder`](modules.md#conferencesolutionbuilder)) => `void`) => [`CalendarBuilder`](modules.md#calendarbuilder) |
| `withCurrentEventAccess` | (`access`: [`CurrentCalendarEventAccess`](modules.md#currentcalendareventaccess)) => [`CalendarBuilder`](modules.md#calendarbuilder) |

#### Defined in

[src/core-types.ts:177](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L177)

___

### CalendarCoferenceCreateFn

Ƭ **CalendarCoferenceCreateFn**: (`p`: \{ `eventData`: `GoogleAppsScript.Addons.CalendarEventObject`  }) => `GoogleAppsScript.Addons.ConferenceDataObject`

#### Type declaration

▸ (`p`): `GoogleAppsScript.Addons.ConferenceDataObject`

##### Parameters

| Name | Type |
| :------ | :------ |
| `p` | `Object` |
| `p.eventData` | `GoogleAppsScript.Addons.CalendarEventObject` |

##### Returns

`GoogleAppsScript.Addons.ConferenceDataObject`

#### Defined in

[src/types.ts:167](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L167)

___

### CalendarConferenceSolution

Ƭ **CalendarConferenceSolution**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `logoUrl?` | [`UrlString`](modules.md#urlstring) |
| `name` | `string` |
| `onCreateFunction` | `string` |

#### Defined in

[src/types.ts:160](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L160)

___

### CalendarEventAttachmentTrigger

Ƭ **CalendarEventAttachmentTrigger**: \{ `label`: `string`  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:181](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L181)

___

### CalendarEventFn

Ƭ **CalendarEventFn**: (`e`: `GoogleAppsScript.Addons.CalendarEventObject`) => `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (`e`): `GoogleAppsScript.Card_Service.Card`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `GoogleAppsScript.Addons.CalendarEventObject` |

##### Returns

`GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:171](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L171)

___

### CalendarResource

Ƭ **CalendarResource**: [`AddOnResource`](modules.md#addonresource) & \{ `conferenceSolution?`: [`CalendarConferenceSolution`](modules.md#calendarconferencesolution)[] ; `createSettingsUrlFunction?`: `string` ; `currentEventAccess?`: [`CurrentCalendarEventAccess`](modules.md#currentcalendareventaccess) ; `eventAttachmentTrigger?`: [`CalendarEventAttachmentTrigger`](modules.md#calendareventattachmenttrigger) ; `eventOpenTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger) ; `eventUpdateTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger)  }

#### Defined in

[src/types.ts:149](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L149)

___

### CalendarSettingsUrlFn

Ƭ **CalendarSettingsUrlFn**: () => [`UrlString`](modules.md#urlstring)

#### Type declaration

▸ (): [`UrlString`](modules.md#urlstring)

##### Returns

[`UrlString`](modules.md#urlstring)

#### Defined in

[src/types.ts:158](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L158)

___

### ChangeManifestOptions

Ƭ **ChangeManifestOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claspJsonPath?` | `string` |
| `manifest` | [`ManifestResource`](modules.md#manifestresource) |

#### Defined in

[src/rollup-plugin.ts:6](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/rollup-plugin.ts#L6)

___

### CommonResource

Ƭ **CommonResource**: [`AddOnResource`](modules.md#addonresource) & \{ `layoutProperties?`: [`LayoutProperties`](modules.md#layoutproperties) ; `logoUrl`: [`UrlString`](modules.md#urlstring) ; `name`: `string` ; `openLinkUrlPrefixes?`: [`AllowedUrlPrefix`](modules.md#allowedurlprefix)[] ; `universalActions?`: [`UniversalAction`](modules.md#universalaction)[] ; `useLocaleFromApp?`: `boolean`  }

#### Defined in

[src/types.ts:122](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L122)

___

### ConferenceSolutionBuilder

Ƭ **ConferenceSolutionBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`name`: `string`, `createFn`: [`CalendarCoferenceCreateFn`](modules.md#calendarcoferencecreatefn), `logoUrl?`: \`https://$\{string}\`, `id?`: `string`) => [`ConferenceSolutionBuilder`](modules.md#conferencesolutionbuilder) |

#### Defined in

[src/core-types.ts:210](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L210)

___

### ContextualTrigger

Ƭ **ContextualTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onTriggerFunction` | `string` |
| `unconditional` | {} |

#### Defined in

[src/types.ts:213](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L213)

___

### ContextualUIBuilder

Ƭ **ContextualUIBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`fn`: [`GmailContextualTriggerFn`](modules.md#gmailcontextualtriggerfn)) => [`ContextualUIBuilder`](modules.md#contextualuibuilder) |

#### Defined in

[src/core-types.ts:252](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L252)

___

### CreateActionsBuilder

Ƭ **CreateActionsBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`label`: `string`, `fn`: [`EditorCreateActionFn`](modules.md#editorcreateactionfn), `logoUrl?`: \`https://$\{string}\`, `localizedLabels?`: `Record`\<`string`, `string`\>) => [`CreateActionsBuilder`](modules.md#createactionsbuilder) |

#### Defined in

[src/core-types.ts:298](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L298)

___

### CurrentCalendarEventAccess

Ƭ **CurrentCalendarEventAccess**: ``"METADATA"`` \| ``"READ"`` \| ``"WRITE"`` \| ``"READ_WRITE"``

#### Defined in

[src/types.ts:175](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L175)

___

### DriveItemsSelectedFn

Ƭ **DriveItemsSelectedFn**: (`e`: `GoogleAppsScript.Addons.DriveEventObject`) => `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (`e`): `GoogleAppsScript.Card_Service.Card`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `GoogleAppsScript.Addons.DriveEventObject` |

##### Returns

`GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:189](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L189)

___

### DriveResource

Ƭ **DriveResource**: [`AddOnResource`](modules.md#addonresource) & \{ `onItemsSelectedTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger)  }

#### Defined in

[src/types.ts:185](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L185)

___

### EditorBuilder

Ƭ **EditorBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onFileScopeGrant` | (`fn`: [`EditorFileScopeGrantFn`](modules.md#editorfilescopegrantfn)) => [`EditorBuilder`](modules.md#editorbuilder) |
| `withCreateActions` | (`conf`: (`p`: [`CreateActionsBuilder`](modules.md#createactionsbuilder)) => `void`) => [`EditorBuilder`](modules.md#editorbuilder) |
| `withPreviews` | (`conf`: (`p`: [`LinkPreviewTriggersBuilder`](modules.md#linkpreviewtriggersbuilder)) => `void`) => [`EditorBuilder`](modules.md#editorbuilder) |

#### Defined in

[src/core-types.ts:260](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L260)

___

### EditorCreateActionFn

Ƭ **EditorCreateActionFn**: () => `GoogleAppsScript.Card_Service.Card`

#### Type declaration

▸ (): `GoogleAppsScript.Card_Service.Card`

##### Returns

`GoogleAppsScript.Card_Service.Card`

#### Defined in

[src/types.ts:253](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L253)

___

### EditorCreateActionTriggers

Ƭ **EditorCreateActionTriggers**: \{ `id`: `string` ; `labelText`: `string` ; `localizedLabelText?`: `Record`\<`string`, `string`\> ; `logoUrl?`: [`UrlString`](modules.md#urlstring)  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:246](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L246)

___

### EditorFileScopeGrantFn

Ƭ **EditorFileScopeGrantFn**: () => `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (): `GoogleAppsScript.Card_Service.Card`[]

##### Returns

`GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:228](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L228)

___

### EditorLinkPreviewTriggers

Ƭ **EditorLinkPreviewTriggers**: \{ `labelText`: `string` ; `localizedLabelText?`: `Record`\<`string`, `string`\> ; `logoUrl?`: [`UrlString`](modules.md#urlstring) ; `patterns`: [`UriPattern`](modules.md#uripattern)[]  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:230](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L230)

___

### EditorResource

Ƭ **EditorResource**: [`AddOnResource`](modules.md#addonresource) & \{ `createActionTriggers?`: [`EditorCreateActionTriggers`](modules.md#editorcreateactiontriggers)[] ; `linkPreviewTriggers?`: [`EditorLinkPreviewTriggers`](modules.md#editorlinkpreviewtriggers)[] ; `onFileScopeGrantedTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger)  }

#### Defined in

[src/types.ts:222](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L222)

___

### Fluent

Ƭ **Fluent**\<`T`, `K`\>: \{ [P in K]: Exclude\<K, P\> extends never ? Function : Function }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, (...`p`: `any`) => `any`\> |
| `K` | extends keyof `T` = keyof `T` |

#### Defined in

[src/core-types.ts:27](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L27)

___

### GmailBuilder

Ƭ **GmailBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCompose` | (`conf`: (`p`: [`SelectActionBuilder`](modules.md#selectactionbuilder)) => `void`, `draftAccess?`: [`GmailDraftAccess`](modules.md#gmaildraftaccess)) => [`GmailBuilder`](modules.md#gmailbuilder) |
| `withContextualUIs` | (`conf`: (`p`: [`ContextualUIBuilder`](modules.md#contextualuibuilder)) => `void`) => [`GmailBuilder`](modules.md#gmailbuilder) |

#### Defined in

[src/core-types.ts:226](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L226)

___

### GmailComposeTrigger

Ƭ **GmailComposeTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `draftAccess?` | [`GmailDraftAccess`](modules.md#gmaildraftaccess) |
| `selectActions` | [`GmailSelectAction`](modules.md#gmailselectaction)[] |

#### Defined in

[src/types.ts:198](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L198)

___

### GmailContextualTriggerFn

Ƭ **GmailContextualTriggerFn**: (`e`: `GoogleAppsScript.Addons.EventObject`) => `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (`e`): `GoogleAppsScript.Card_Service.Card`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `GoogleAppsScript.Addons.EventObject` |

##### Returns

`GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:218](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L218)

___

### GmailDraftAccess

Ƭ **GmailDraftAccess**: ``"NONE"`` \| ``"METADATA"``

#### Defined in

[src/types.ts:203](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L203)

___

### GmailResource

Ƭ **GmailResource**: [`AddOnResource`](modules.md#addonresource) & \{ `composeTrigger?`: [`GmailComposeTrigger`](modules.md#gmailcomposetrigger) ; `contextualTriggers?`: [`ContextualTrigger`](modules.md#contextualtrigger)[]  }

#### Defined in

[src/types.ts:193](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L193)

___

### GmailSelectAction

Ƭ **GmailSelectAction**: \{ `text`: `string`  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:205](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L205)

___

### GmailSelectActionFn

Ƭ **GmailSelectActionFn**: () => `GoogleAppsScript.Card_Service.Card` \| `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (): `GoogleAppsScript.Card_Service.Card` \| `GoogleAppsScript.Card_Service.Card`[]

##### Returns

`GoogleAppsScript.Card_Service.Card` \| `GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:209](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L209)

___

### HomepageTrigger

Ƭ **HomepageTrigger**: \{ `enabled?`: `boolean`  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:110](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L110)

___

### HomepageTriggerFn

Ƭ **HomepageTriggerFn**: (`e`: `GoogleAppsScript.Addons.EventObject`) => `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (`e`): `GoogleAppsScript.Card_Service.Card`[]

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `GoogleAppsScript.Addons.EventObject` |

##### Returns

`GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:114](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L114)

___

### LayoutProperties

Ƭ **LayoutProperties**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `primaryColor?` | `string` |
| `secondaryColor?` | `string` |

#### Defined in

[src/types.ts:131](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L131)

___

### LinkPreviewTriggerFn

Ƭ **LinkPreviewTriggerFn**: (`e`: `GoogleAppsScript.Addons.EventObject`) => `GoogleAppsScript.Card_Service.Card`

#### Type declaration

▸ (`e`): `GoogleAppsScript.Card_Service.Card`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `GoogleAppsScript.Addons.EventObject` |

##### Returns

`GoogleAppsScript.Card_Service.Card`

#### Defined in

[src/types.ts:237](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L237)

___

### LinkPreviewTriggersBuilder

Ƭ **LinkPreviewTriggersBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`label`: `string`, `fn`: [`LinkPreviewTriggerFn`](modules.md#linkpreviewtriggerfn), `patterns`: \`https://$\{string}\`[], `logoUrl?`: \`https://$\{string}\`, `localizedLabels?`: `Record`\<`string`, `string`\>) => [`LinkPreviewTriggersBuilder`](modules.md#linkpreviewtriggersbuilder) |

#### Defined in

[src/core-types.ts:280](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L280)

___

### ManifestBuilder

Ƭ **ManifestBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `withAddOn` | (`name`: `string`, `logoUrl`: \`https://$\{string}\`, `homepage`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn), `conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`AddOnBuilder`](modules.md#addonbuilder), keyof [`AddOnBuilder`](modules.md#addonbuilder)\>) => `void`) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withScopes` | (`conf`: (`p`: [`Fluent`](modules.md#fluent)\<[`OauthScopesBuilder`](modules.md#oauthscopesbuilder), keyof [`OauthScopesBuilder`](modules.md#oauthscopesbuilder)\>) => `void`) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withUrlFetchWhitelist` | (...`urls`: \`https://$\{string}/\`[]) => [`ManifestBuilder`](modules.md#manifestbuilder) |

#### Defined in

[src/core-types.ts:36](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L36)

___

### ManifestResource

Ƭ **ManifestResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addOns?` | [`AddOnsResource`](modules.md#addonsresource) |
| `oauthScopes?` | [`OauthScopes`](modules.md#oauthscopes)[] |
| `urlFetchWhitelist?` | [`AllowedUrlPrefix`](modules.md#allowedurlprefix)[] |

#### Defined in

[src/types.ts:1](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L1)

___

### OauthScopes

Ƭ **OauthScopes**: \`https://www.googleapis.com/auth/$\{OauthScopesKeys}\`

#### Defined in

[src/types.ts:91](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L91)

___

### OauthScopesAppScriptKeys

Ƭ **OauthScopesAppScriptKeys**: ``"admin.directory.group"`` \| ``"admin.directory.user"`` \| ``"documents"`` \| ``"drive"`` \| ``"forms"`` \| ``"forms.currentonly"`` \| ``"groups"`` \| ``"script.deployments"`` \| ``"script.deployments.readonly"`` \| ``"script.metrics"`` \| ``"script.processes"`` \| ``"script.projects"`` \| ``"script.projects.readonly"`` \| ``"spreadsheets"`` \| ``"userinfo.email"`` \| ``"script.external_request"`` \| ``"script.locale"`` \| ``"script.scriptapp"`` \| ``"workspace.linkpreview"`` \| ``"workspace.linkcreate"``

#### Defined in

[src/types.ts:9](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L9)

___

### OauthScopesBuilder

Ƭ **OauthScopesBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `withScopes` | (...`scopes`: [`OauthScopesKeys`](modules.md#oauthscopeskeys)[]) => [`OauthScopesBuilder`](modules.md#oauthscopesbuilder) |
| `withTriggerManagement` | () => [`OauthScopesBuilder`](modules.md#oauthscopesbuilder) |
| `withUrlFetch` | () => [`OauthScopesBuilder`](modules.md#oauthscopesbuilder) |

#### Defined in

[src/core-types.ts:62](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L62)

___

### OauthScopesCalendarKeys

Ƭ **OauthScopesCalendarKeys**: ``"calendar"`` \| ``"calendar.events"`` \| ``"calendar.events.readonly"`` \| ``"calendar.readonly"`` \| ``"calendar.settings.readonly"`` \| ``"calendar.addons.execute"`` \| ``"calendar.addons.current.event.read"`` \| ``"calendar.addons.current.event.write"``

#### Defined in

[src/types.ts:31](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L31)

___

### OauthScopesDocsKeys

Ƭ **OauthScopesDocsKeys**: ``"documents"`` \| ``"documents.readonly"`` \| ``"documents.currentonly"``

#### Defined in

[src/types.ts:69](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L69)

___

### OauthScopesDriveKeys

Ƭ **OauthScopesDriveKeys**: ``"drive"`` \| ``"drive.appdata"`` \| ``"drive.file"`` \| ``"drive.metadata"`` \| ``"drive.metadata.readonl"`` \| ``"drive.photos.readonly"`` \| ``"drive.readonly"`` \| ``"drive.scripts"`` \| ``"drive.activity"`` \| ``"drive.activity.readonly"`` \| ``"drive.addons.metadata.readonly"``

#### Defined in

[src/types.ts:41](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L41)

___

### OauthScopesGmailKeys

Ƭ **OauthScopesGmailKeys**: ``"gmail.addons.current.action.compose"`` \| ``"gmail.addons.current.message.action"`` \| ``"gmail.addons.current.message.metadata"`` \| ``"gmail.addons.current.message.readonly"`` \| ``"gmail.compose"`` \| ``"gmail.insert"`` \| ``"gmail.labels"`` \| ``"gmail.metadata"`` \| ``"gmail.modify"`` \| ``"gmail.readonly"`` \| ``"gmail.send"`` \| ``"gmail.settings.basic"`` \| ``"gmail.settings.sharing"``

#### Defined in

[src/types.ts:54](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L54)

___

### OauthScopesKeys

Ƭ **OauthScopesKeys**: [`OauthScopesAppScriptKeys`](modules.md#oauthscopesappscriptkeys) \| [`OauthScopesCalendarKeys`](modules.md#oauthscopescalendarkeys) \| [`OauthScopesDriveKeys`](modules.md#oauthscopesdrivekeys) \| [`OauthScopesGmailKeys`](modules.md#oauthscopesgmailkeys) \| [`OauthScopesDocsKeys`](modules.md#oauthscopesdocskeys) \| [`OauthScopesSheetsKeys`](modules.md#oauthscopessheetskeys) \| [`OauthScopesSlidesKeys`](modules.md#oauthscopesslideskeys)

#### Defined in

[src/types.ts:82](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L82)

___

### OauthScopesSheetsKeys

Ƭ **OauthScopesSheetsKeys**: ``"spreadsheets"`` \| ``"spreadsheets.readonly"`` \| ``"spreadsheets.currentonly"``

#### Defined in

[src/types.ts:73](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L73)

___

### OauthScopesSlidesKeys

Ƭ **OauthScopesSlidesKeys**: ``"presentations"`` \| ``"presentations.readonly"`` \| ``"presentations.currentonly"``

#### Defined in

[src/types.ts:77](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L77)

___

### RunFunctionTrigger

Ƭ **RunFunctionTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `runFunction` | `string` |

#### Defined in

[src/types.ts:106](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L106)

___

### SelectActionBuilder

Ƭ **SelectActionBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`text`: `string`, `fn`: [`GmailSelectActionFn`](modules.md#gmailselectactionfn)) => [`SelectActionBuilder`](modules.md#selectactionbuilder) |

#### Defined in

[src/core-types.ts:243](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L243)

___

### UniversalAction

Ƭ **UniversalAction**: \{ `label`: `string`  } & \{ `openLink`: [`UrlString`](modules.md#urlstring)  } \| [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:136](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L136)

___

### UniversalActionBuilder

Ƭ **UniversalActionBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`label`: `string`, `link`: \`https://$\{string}\`) => [`UniversalActionBuilder`](modules.md#universalactionbuilder)(`label`: `string`, `fn`: [`UniversalActionFn`](modules.md#universalactionfn)) => [`UniversalActionBuilder`](modules.md#universalactionbuilder) |

#### Defined in

[src/core-types.ts:162](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core-types.ts#L162)

___

### UniversalActionFn

Ƭ **UniversalActionFn**: (`e`: `GoogleAppsScript.Addons.EventObject`) => `GoogleAppsScript.Card_Service.UniversalActionResponse` \| `void`

#### Type declaration

▸ (`e`): `GoogleAppsScript.Card_Service.UniversalActionResponse` \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `GoogleAppsScript.Addons.EventObject` |

##### Returns

`GoogleAppsScript.Card_Service.UniversalActionResponse` \| `void`

#### Defined in

[src/types.ts:145](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L145)

___

### UriPattern

Ƭ **UriPattern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hostPattern` | `string` |
| `pathPrefix?` | `string` |

#### Defined in

[src/types.ts:241](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L241)

___

### UrlString

Ƭ **UrlString**: \`https://$\{string}\`

#### Defined in

[src/types.ts:93](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/types.ts#L93)

## Functions

### defineManifest

▸ **defineManifest**(`conf`): [`ManifestResource`](modules.md#manifestresource)

#### Parameters

| Name | Type |
| :------ | :------ |
| `conf` | (`builder`: [`Fluent`](modules.md#fluent)\<[`ManifestBuilder`](modules.md#manifestbuilder)\>) => `void` |

#### Returns

[`ManifestResource`](modules.md#manifestresource)

#### Defined in

[src/core.ts:453](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/core.ts#L453)

___

### manifestPligin

▸ **manifestPligin**(`options`): `Plugin`

Plugin function to control the appsscript manifest generation and update.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [`ChangeManifestOptions`](modules.md#changemanifestoptions) | Object containing the ManifestResource definition and the ".clasp.json" file path (default: ./). |

#### Returns

`Plugin`

Rollup/Vite plugin

#### Defined in

[src/rollup-plugin.ts:18](https://github.com/gasstack/gasstack/blob/1198143/packages/manifest/src/rollup-plugin.ts#L18)

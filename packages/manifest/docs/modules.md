[@gasstack/manifest](README.md) / Exports

# @gasstack/manifest

## Table of contents

### Type Aliases

- [AccessType](modules.md#accesstype)
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
- [Digit](modules.md#digit)
- [DriveItemsSelectedFn](modules.md#driveitemsselectedfn)
- [DriveResource](modules.md#driveresource)
- [EditorBuilder](modules.md#editorbuilder)
- [EditorCreateActionFn](modules.md#editorcreateactionfn)
- [EditorCreateActionTriggers](modules.md#editorcreateactiontriggers)
- [EditorFileScopeGrantFn](modules.md#editorfilescopegrantfn)
- [EditorLinkPreviewTriggers](modules.md#editorlinkpreviewtriggers)
- [EditorResource](modules.md#editorresource)
- [ExecuteAsType](modules.md#executeastype)
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
- [LoggingType](modules.md#loggingtype)
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
- [SheetMacro](modules.md#sheetmacro)
- [SheetsMacroBuilder](modules.md#sheetsmacrobuilder)
- [ShortcutBuilder](modules.md#shortcutbuilder)
- [UniversalAction](modules.md#universalaction)
- [UniversalActionBuilder](modules.md#universalactionbuilder)
- [UniversalActionFn](modules.md#universalactionfn)
- [UriPattern](modules.md#uripattern)
- [UrlString](modules.md#urlstring)

### Functions

- [defineManifest](modules.md#definemanifest)
- [manifestPligin](modules.md#manifestpligin)

## Type Aliases

### AccessType

Ƭ **AccessType**: ``"MYSELF"`` \| ``"DOMAIN"`` \| ``"ANYONE"`` \| ``"ANYONE_ANONYMOUS"``

#### Defined in

[src/types.ts:111](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L111)

___

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

[src/core-types.ts:118](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L118)

___

### AddOnResource

Ƭ **AddOnResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `homepageTrigger?` | [`HomepageTrigger`](modules.md#homepagetrigger) |

#### Defined in

[src/types.ts:136](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L136)

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

[src/types.ts:114](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L114)

___

### AllowedUrlPrefix

Ƭ **AllowedUrlPrefix**: \`$\{UrlString}/\`

#### Defined in

[src/types.ts:108](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L108)

___

### Builder

Ƭ **Builder**\<`T`, `K`\>: \{ [P in K]: Function } & \{ `build`: `T`[``"build"``]  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends \{ `build`: (...`a`: `any`) => `any`  } & `Record`\<`string`, (...`p`: `any`) => `any`\> |
| `K` | extends keyof `T` = `Exclude`\<keyof `T`, ``"build"``\> |

#### Defined in

[src/core-types.ts:24](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L24)

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

[src/core-types.ts:217](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L217)

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

[src/types.ts:185](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L185)

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

[src/types.ts:178](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L178)

___

### CalendarEventAttachmentTrigger

Ƭ **CalendarEventAttachmentTrigger**: \{ `label`: `string`  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:199](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L199)

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

[src/types.ts:189](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L189)

___

### CalendarResource

Ƭ **CalendarResource**: [`AddOnResource`](modules.md#addonresource) & \{ `conferenceSolution?`: [`CalendarConferenceSolution`](modules.md#calendarconferencesolution)[] ; `createSettingsUrlFunction?`: `string` ; `currentEventAccess?`: [`CurrentCalendarEventAccess`](modules.md#currentcalendareventaccess) ; `eventAttachmentTrigger?`: [`CalendarEventAttachmentTrigger`](modules.md#calendareventattachmenttrigger) ; `eventOpenTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger) ; `eventUpdateTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger)  }

#### Defined in

[src/types.ts:167](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L167)

___

### CalendarSettingsUrlFn

Ƭ **CalendarSettingsUrlFn**: () => [`UrlString`](modules.md#urlstring)

#### Type declaration

▸ (): [`UrlString`](modules.md#urlstring)

##### Returns

[`UrlString`](modules.md#urlstring)

#### Defined in

[src/types.ts:176](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L176)

___

### ChangeManifestOptions

Ƭ **ChangeManifestOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `claspJsonPath?` | `string` |
| `manifest` | [`ManifestResource`](modules.md#manifestresource) |

#### Defined in

[src/rollup-plugin.ts:6](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/rollup-plugin.ts#L6)

___

### CommonResource

Ƭ **CommonResource**: [`AddOnResource`](modules.md#addonresource) & \{ `layoutProperties?`: [`LayoutProperties`](modules.md#layoutproperties) ; `logoUrl`: [`UrlString`](modules.md#urlstring) ; `name`: `string` ; `openLinkUrlPrefixes?`: [`AllowedUrlPrefix`](modules.md#allowedurlprefix)[] ; `universalActions?`: [`UniversalAction`](modules.md#universalaction)[] ; `useLocaleFromApp?`: `boolean`  }

#### Defined in

[src/types.ts:140](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L140)

___

### ConferenceSolutionBuilder

Ƭ **ConferenceSolutionBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`name`: `string`, `createFn`: [`CalendarCoferenceCreateFn`](modules.md#calendarcoferencecreatefn), `logoUrl?`: \`https://$\{string}\`, `id?`: `string`) => [`ConferenceSolutionBuilder`](modules.md#conferencesolutionbuilder) |

#### Defined in

[src/core-types.ts:250](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L250)

___

### ContextualTrigger

Ƭ **ContextualTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onTriggerFunction` | `string` |
| `unconditional` | {} |

#### Defined in

[src/types.ts:231](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L231)

___

### ContextualUIBuilder

Ƭ **ContextualUIBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`fn`: [`GmailContextualTriggerFn`](modules.md#gmailcontextualtriggerfn)) => [`ContextualUIBuilder`](modules.md#contextualuibuilder) |

#### Defined in

[src/core-types.ts:292](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L292)

___

### CreateActionsBuilder

Ƭ **CreateActionsBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`label`: `string`, `fn`: [`EditorCreateActionFn`](modules.md#editorcreateactionfn), `logoUrl?`: \`https://$\{string}\`, `localizedLabels?`: `Record`\<`string`, `string`\>) => [`CreateActionsBuilder`](modules.md#createactionsbuilder) |

#### Defined in

[src/core-types.ts:338](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L338)

___

### CurrentCalendarEventAccess

Ƭ **CurrentCalendarEventAccess**: ``"METADATA"`` \| ``"READ"`` \| ``"WRITE"`` \| ``"READ_WRITE"``

#### Defined in

[src/types.ts:193](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L193)

___

### Digit

Ƭ **Digit**: ``0`` \| ``1`` \| ``2`` \| ``3`` \| ``4`` \| ``5`` \| ``6`` \| ``7`` \| ``8`` \| ``9``

#### Defined in

[src/types.ts:13](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L13)

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

[src/types.ts:207](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L207)

___

### DriveResource

Ƭ **DriveResource**: [`AddOnResource`](modules.md#addonresource) & \{ `onItemsSelectedTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger)  }

#### Defined in

[src/types.ts:203](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L203)

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

[src/core-types.ts:300](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L300)

___

### EditorCreateActionFn

Ƭ **EditorCreateActionFn**: () => `GoogleAppsScript.Card_Service.Card`

#### Type declaration

▸ (): `GoogleAppsScript.Card_Service.Card`

##### Returns

`GoogleAppsScript.Card_Service.Card`

#### Defined in

[src/types.ts:271](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L271)

___

### EditorCreateActionTriggers

Ƭ **EditorCreateActionTriggers**: \{ `id`: `string` ; `labelText`: `string` ; `localizedLabelText?`: `Record`\<`string`, `string`\> ; `logoUrl?`: [`UrlString`](modules.md#urlstring)  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:264](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L264)

___

### EditorFileScopeGrantFn

Ƭ **EditorFileScopeGrantFn**: () => `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (): `GoogleAppsScript.Card_Service.Card`[]

##### Returns

`GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:246](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L246)

___

### EditorLinkPreviewTriggers

Ƭ **EditorLinkPreviewTriggers**: \{ `labelText`: `string` ; `localizedLabelText?`: `Record`\<`string`, `string`\> ; `logoUrl?`: [`UrlString`](modules.md#urlstring) ; `patterns`: [`UriPattern`](modules.md#uripattern)[]  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:248](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L248)

___

### EditorResource

Ƭ **EditorResource**: [`AddOnResource`](modules.md#addonresource) & \{ `createActionTriggers?`: [`EditorCreateActionTriggers`](modules.md#editorcreateactiontriggers)[] ; `linkPreviewTriggers?`: [`EditorLinkPreviewTriggers`](modules.md#editorlinkpreviewtriggers)[] ; `onFileScopeGrantedTrigger?`: [`RunFunctionTrigger`](modules.md#runfunctiontrigger)  }

#### Defined in

[src/types.ts:240](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L240)

___

### ExecuteAsType

Ƭ **ExecuteAsType**: ``"USER_ACCESSING"`` \| ``"USER_DEPLOYING"``

#### Defined in

[src/types.ts:112](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L112)

___

### Fluent

Ƭ **Fluent**\<`T`, `K`\>: \{ [P in K]: Exclude\<K, P\> extends never ? Function : Function }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Record`\<`string`, (...`p`: `any`) => `any`\> |
| `K` | extends keyof `T` = keyof `T` |

#### Defined in

[src/core-types.ts:31](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L31)

___

### GmailBuilder

Ƭ **GmailBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `onCompose` | (`conf`: (`p`: [`SelectActionBuilder`](modules.md#selectactionbuilder)) => `void`, `draftAccess?`: [`GmailDraftAccess`](modules.md#gmaildraftaccess)) => [`GmailBuilder`](modules.md#gmailbuilder) |
| `withContextualUIs` | (`conf`: (`p`: [`ContextualUIBuilder`](modules.md#contextualuibuilder)) => `void`) => [`GmailBuilder`](modules.md#gmailbuilder) |

#### Defined in

[src/core-types.ts:266](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L266)

___

### GmailComposeTrigger

Ƭ **GmailComposeTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `draftAccess?` | [`GmailDraftAccess`](modules.md#gmaildraftaccess) |
| `selectActions` | [`GmailSelectAction`](modules.md#gmailselectaction)[] |

#### Defined in

[src/types.ts:216](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L216)

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

[src/types.ts:236](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L236)

___

### GmailDraftAccess

Ƭ **GmailDraftAccess**: ``"NONE"`` \| ``"METADATA"``

#### Defined in

[src/types.ts:221](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L221)

___

### GmailResource

Ƭ **GmailResource**: [`AddOnResource`](modules.md#addonresource) & \{ `composeTrigger?`: [`GmailComposeTrigger`](modules.md#gmailcomposetrigger) ; `contextualTriggers?`: [`ContextualTrigger`](modules.md#contextualtrigger)[]  }

#### Defined in

[src/types.ts:211](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L211)

___

### GmailSelectAction

Ƭ **GmailSelectAction**: \{ `text`: `string`  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:223](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L223)

___

### GmailSelectActionFn

Ƭ **GmailSelectActionFn**: () => `GoogleAppsScript.Card_Service.Card` \| `GoogleAppsScript.Card_Service.Card`[]

#### Type declaration

▸ (): `GoogleAppsScript.Card_Service.Card` \| `GoogleAppsScript.Card_Service.Card`[]

##### Returns

`GoogleAppsScript.Card_Service.Card` \| `GoogleAppsScript.Card_Service.Card`[]

#### Defined in

[src/types.ts:227](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L227)

___

### HomepageTrigger

Ƭ **HomepageTrigger**: \{ `enabled?`: `boolean`  } & [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:128](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L128)

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

[src/types.ts:132](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L132)

___

### LayoutProperties

Ƭ **LayoutProperties**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `primaryColor?` | `string` |
| `secondaryColor?` | `string` |

#### Defined in

[src/types.ts:149](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L149)

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

[src/types.ts:255](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L255)

___

### LinkPreviewTriggersBuilder

Ƭ **LinkPreviewTriggersBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`label`: `string`, `fn`: [`LinkPreviewTriggerFn`](modules.md#linkpreviewtriggerfn), `patterns`: \`https://$\{string}\`[], `logoUrl?`: \`https://$\{string}\`, `localizedLabels?`: `Record`\<`string`, `string`\>) => [`LinkPreviewTriggersBuilder`](modules.md#linkpreviewtriggersbuilder) |

#### Defined in

[src/core-types.ts:320](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L320)

___

### LoggingType

Ƭ **LoggingType**: ``"NONE"`` \| ``"STACKDRIVER"``

#### Defined in

[src/types.ts:110](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L110)

___

### ManifestBuilder

Ƭ **ManifestBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `withAddOn` | (`name`: `string`, `logoUrl`: \`https://$\{string}\`, `homepage`: [`HomepageTriggerFn`](modules.md#homepagetriggerfn), `conf?`: (`p`: [`Fluent`](modules.md#fluent)\<[`AddOnBuilder`](modules.md#addonbuilder), keyof [`AddOnBuilder`](modules.md#addonbuilder)\>) => `void`) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withExecutionApi` | (`access`: [`AccessType`](modules.md#accesstype)) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withLogging` | (`value`: [`LoggingType`](modules.md#loggingtype)) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withScopes` | (`conf`: (`p`: [`Fluent`](modules.md#fluent)\<[`OauthScopesBuilder`](modules.md#oauthscopesbuilder), keyof [`OauthScopesBuilder`](modules.md#oauthscopesbuilder)\>) => `void`) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withSheetsMacro` | (`conf`: (`p`: [`SheetsMacroBuilder`](modules.md#sheetsmacrobuilder)) => `void`) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withUrlFetchWhitelist` | (...`urls`: \`https://$\{string}/\`[]) => [`ManifestBuilder`](modules.md#manifestbuilder) |
| `withWebApp` | (`access`: [`AccessType`](modules.md#accesstype), `executeAs`: [`ExecuteAsType`](modules.md#executeastype)) => [`ManifestBuilder`](modules.md#manifestbuilder) |

#### Defined in

[src/core-types.ts:40](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L40)

___

### ManifestResource

Ƭ **ManifestResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addOns?` | [`AddOnsResource`](modules.md#addonsresource) |
| `exceptionLogging?` | [`LoggingType`](modules.md#loggingtype) |
| `executionApi?` | \{ `access`: [`AccessType`](modules.md#accesstype)  } |
| `executionApi.access` | [`AccessType`](modules.md#accesstype) |
| `oauthScopes?` | [`OauthScopes`](modules.md#oauthscopes)[] |
| `sheets?` | \{ `macros`: [`SheetMacro`](modules.md#sheetmacro)[]  } |
| `sheets.macros` | [`SheetMacro`](modules.md#sheetmacro)[] |
| `urlFetchWhitelist?` | [`AllowedUrlPrefix`](modules.md#allowedurlprefix)[] |
| `webapp?` | \{ `access`: [`AccessType`](modules.md#accesstype) ; `executeAs`: [`ExecuteAsType`](modules.md#executeastype)  } |
| `webapp.access` | [`AccessType`](modules.md#accesstype) |
| `webapp.executeAs` | [`ExecuteAsType`](modules.md#executeastype) |

#### Defined in

[src/types.ts:1](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L1)

___

### OauthScopes

Ƭ **OauthScopes**: \`https://www.googleapis.com/auth/$\{OauthScopesKeys}\`

#### Defined in

[src/types.ts:105](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L105)

___

### OauthScopesAppScriptKeys

Ƭ **OauthScopesAppScriptKeys**: ``"admin.directory.group"`` \| ``"admin.directory.user"`` \| ``"documents"`` \| ``"drive"`` \| ``"forms"`` \| ``"forms.currentonly"`` \| ``"groups"`` \| ``"script.deployments"`` \| ``"script.deployments.readonly"`` \| ``"script.metrics"`` \| ``"script.processes"`` \| ``"script.projects"`` \| ``"script.projects.readonly"`` \| ``"spreadsheets"`` \| ``"userinfo.email"`` \| ``"script.external_request"`` \| ``"script.locale"`` \| ``"script.scriptapp"`` \| ``"workspace.linkpreview"`` \| ``"workspace.linkcreate"``

#### Defined in

[src/types.ts:23](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L23)

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

[src/core-types.ts:87](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L87)

___

### OauthScopesCalendarKeys

Ƭ **OauthScopesCalendarKeys**: ``"calendar"`` \| ``"calendar.events"`` \| ``"calendar.events.readonly"`` \| ``"calendar.readonly"`` \| ``"calendar.settings.readonly"`` \| ``"calendar.addons.execute"`` \| ``"calendar.addons.current.event.read"`` \| ``"calendar.addons.current.event.write"``

#### Defined in

[src/types.ts:45](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L45)

___

### OauthScopesDocsKeys

Ƭ **OauthScopesDocsKeys**: ``"documents"`` \| ``"documents.readonly"`` \| ``"documents.currentonly"``

#### Defined in

[src/types.ts:83](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L83)

___

### OauthScopesDriveKeys

Ƭ **OauthScopesDriveKeys**: ``"drive"`` \| ``"drive.appdata"`` \| ``"drive.file"`` \| ``"drive.metadata"`` \| ``"drive.metadata.readonl"`` \| ``"drive.photos.readonly"`` \| ``"drive.readonly"`` \| ``"drive.scripts"`` \| ``"drive.activity"`` \| ``"drive.activity.readonly"`` \| ``"drive.addons.metadata.readonly"``

#### Defined in

[src/types.ts:55](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L55)

___

### OauthScopesGmailKeys

Ƭ **OauthScopesGmailKeys**: ``"gmail.addons.current.action.compose"`` \| ``"gmail.addons.current.message.action"`` \| ``"gmail.addons.current.message.metadata"`` \| ``"gmail.addons.current.message.readonly"`` \| ``"gmail.compose"`` \| ``"gmail.insert"`` \| ``"gmail.labels"`` \| ``"gmail.metadata"`` \| ``"gmail.modify"`` \| ``"gmail.readonly"`` \| ``"gmail.send"`` \| ``"gmail.settings.basic"`` \| ``"gmail.settings.sharing"``

#### Defined in

[src/types.ts:68](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L68)

___

### OauthScopesKeys

Ƭ **OauthScopesKeys**: [`OauthScopesAppScriptKeys`](modules.md#oauthscopesappscriptkeys) \| [`OauthScopesCalendarKeys`](modules.md#oauthscopescalendarkeys) \| [`OauthScopesDriveKeys`](modules.md#oauthscopesdrivekeys) \| [`OauthScopesGmailKeys`](modules.md#oauthscopesgmailkeys) \| [`OauthScopesDocsKeys`](modules.md#oauthscopesdocskeys) \| [`OauthScopesSheetsKeys`](modules.md#oauthscopessheetskeys) \| [`OauthScopesSlidesKeys`](modules.md#oauthscopesslideskeys)

#### Defined in

[src/types.ts:96](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L96)

___

### OauthScopesSheetsKeys

Ƭ **OauthScopesSheetsKeys**: ``"spreadsheets"`` \| ``"spreadsheets.readonly"`` \| ``"spreadsheets.currentonly"``

#### Defined in

[src/types.ts:87](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L87)

___

### OauthScopesSlidesKeys

Ƭ **OauthScopesSlidesKeys**: ``"presentations"`` \| ``"presentations.readonly"`` \| ``"presentations.currentonly"``

#### Defined in

[src/types.ts:91](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L91)

___

### RunFunctionTrigger

Ƭ **RunFunctionTrigger**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `runFunction` | `string` |

#### Defined in

[src/types.ts:124](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L124)

___

### SelectActionBuilder

Ƭ **SelectActionBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`text`: `string`, `fn`: [`GmailSelectActionFn`](modules.md#gmailselectactionfn)) => [`SelectActionBuilder`](modules.md#selectactionbuilder) |

#### Defined in

[src/core-types.ts:283](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L283)

___

### SheetMacro

Ƭ **SheetMacro**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `defaultShortcut?` | \`Ctrl+Alt+Shift+$\{Digit}\` |
| `functionName` | `string` |
| `menuName` | `string` |

#### Defined in

[src/types.ts:15](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L15)

___

### SheetsMacroBuilder

Ƭ **SheetsMacroBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`menuName`: `string`, `fn`: () => `void`, `shortcutNumber?`: [`Digit`](modules.md#digit)) => [`SheetsMacroBuilder`](modules.md#sheetsmacrobuilder) |

#### Defined in

[src/core-types.ts:103](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L103)

___

### ShortcutBuilder

Ƭ **ShortcutBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Alt` | () => [`ShortcutBuilder`](modules.md#shortcutbuilder) |
| `Char` | (`value`: `string`) => [`ShortcutBuilder`](modules.md#shortcutbuilder) |
| `Ctrl` | () => [`ShortcutBuilder`](modules.md#shortcutbuilder) |
| `Shift` | () => [`ShortcutBuilder`](modules.md#shortcutbuilder) |

#### Defined in

[src/core-types.ts:111](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L111)

___

### UniversalAction

Ƭ **UniversalAction**: \{ `label`: `string`  } & \{ `openLink`: [`UrlString`](modules.md#urlstring)  } \| [`RunFunctionTrigger`](modules.md#runfunctiontrigger)

#### Defined in

[src/types.ts:154](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L154)

___

### UniversalActionBuilder

Ƭ **UniversalActionBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `add` | (`label`: `string`, `link`: \`https://$\{string}\`) => [`UniversalActionBuilder`](modules.md#universalactionbuilder)(`label`: `string`, `fn`: [`UniversalActionFn`](modules.md#universalactionfn)) => [`UniversalActionBuilder`](modules.md#universalactionbuilder) |

#### Defined in

[src/core-types.ts:202](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core-types.ts#L202)

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

[src/types.ts:163](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L163)

___

### UriPattern

Ƭ **UriPattern**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `hostPattern` | `string` |
| `pathPrefix?` | `string` |

#### Defined in

[src/types.ts:259](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L259)

___

### UrlString

Ƭ **UrlString**: \`https://$\{string}\`

#### Defined in

[src/types.ts:107](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/types.ts#L107)

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

[src/core.ts:511](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/core.ts#L511)

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

[src/rollup-plugin.ts:18](https://github.com/gasstack/gasstack/blob/aa832c3/packages/manifest/src/rollup-plugin.ts#L18)

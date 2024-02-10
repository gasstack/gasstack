[@gasstack/kv](README.md) / Exports

# @gasstack/kv

## Table of contents

### Type Aliases

- [KVStore](modules.md#kvstore)
- [KVStoreValue](modules.md#kvstorevalue)

### Functions

- [createCacheStore](modules.md#createcachestore)
- [createPropertiesStore](modules.md#createpropertiesstore)
- [createSpreadsheetStore](modules.md#createspreadsheetstore)

## Type Aliases

### KVStore

Ƭ **KVStore**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `clear` | () => `void` |
| `delete` | (`key`: `string`) => `void` |
| `entries` | () => \{ `[key: string]`: [`KVStoreValue`](modules.md#kvstorevalue);  } |
| `get` | (`key`: `string`) => [`KVStoreValue`](modules.md#kvstorevalue) |
| `has` | (`key`: `string`) => `boolean` |
| `set` | (`key`: `string`, `value`: [`KVStoreValue`](modules.md#kvstorevalue)) => `void` |

#### Defined in

[src/type.ts:3](https://github.com/gasstack/gasstack/blob/e76c2d4/packages/kv/src/type.ts#L3)

___

### KVStoreValue

Ƭ **KVStoreValue**: `string` \| `number` \| `Date` \| `boolean` \| `object`

#### Defined in

[src/type.ts:1](https://github.com/gasstack/gasstack/blob/e76c2d4/packages/kv/src/type.ts#L1)

## Functions

### createCacheStore

▸ **createCacheStore**(`cache`, `expiration?`): [`KVStore`](modules.md#kvstore)

Creates a Key-Value store out of a Google App Script cache store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache` | `Cache` | Google App Script cache (Script, User or Document). |
| `expiration?` | `number` | Time to live in seconds of the entries. |

#### Returns

[`KVStore`](modules.md#kvstore)

Generic Key-Value store.

#### Defined in

src/cache-store.ts:9

___

### createPropertiesStore

▸ **createPropertiesStore**(`properties`): [`KVStore`](modules.md#kvstore)

Creates a Key-Value store out of a Google App Script property store.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `properties` | `Properties` | Google App Script property store (Script, User or Document). |

#### Returns

[`KVStore`](modules.md#kvstore)

Generic Key-Value store.

#### Defined in

[src/prop-store.ts:8](https://github.com/gasstack/gasstack/blob/e76c2d4/packages/kv/src/prop-store.ts#L8)

___

### createSpreadsheetStore

▸ **createSpreadsheetStore**(`range`): [`KVStore`](modules.md#kvstore)

Creates a Key-Value store out of a Spreadsheet data range of two columns.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `range` | `Range` | Spreadsheet range of two columns. |

#### Returns

[`KVStore`](modules.md#kvstore)

Generic Key-Value store.

#### Defined in

[src/sheet-store.ts:18](https://github.com/gasstack/gasstack/blob/e76c2d4/packages/kv/src/sheet-store.ts#L18)

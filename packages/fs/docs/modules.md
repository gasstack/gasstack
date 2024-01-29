[@gasstack/fs](README.md) / Exports

# @gasstack/fs

## Table of contents

### Type Aliases

- [DriveItem](modules.md#driveitem)
- [DriveItemIterator](modules.md#driveitemiterator)

### Functions

- [continueFiles](modules.md#continuefiles)
- [continueFolders](modules.md#continuefolders)
- [fromDriveIterator](modules.md#fromdriveiterator)
- [getFiles](modules.md#getfiles)
- [getFolders](modules.md#getfolders)

## Type Aliases

### DriveItem

Ƭ **DriveItem**: `GoogleAppsScript.Drive.File` \| `GoogleAppsScript.Drive.Folder`

#### Defined in

[src/types.ts:1](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/types.ts#L1)

___

### DriveItemIterator

Ƭ **DriveItemIterator**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DriveItem`](modules.md#driveitem) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getContinuationToken` | () => `string` |
| `hasNext` | () => `boolean` |
| `next` | () => `T` |

#### Defined in

[src/types.ts:5](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/types.ts#L5)

## Functions

### continueFiles

▸ **continueFiles**(`continuationToken`, `limit?`): `File`[]

Continues a pagination read based on a continuation token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `continuationToken` | `string` | Token of the previous iterator. |
| `limit?` | `number` | Number of item to read. |

#### Returns

`File`[]

Array of Files.

#### Defined in

[src/utils.ts:63](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/utils.ts#L63)

___

### continueFolders

▸ **continueFolders**(`continuationToken`, `limit?`): `Folder`[]

Continues a pagination read based on a continuation token.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `continuationToken` | `string` | Token of the previous iterator. |
| `limit?` | `number` | Number of item to read. |

#### Returns

`Folder`[]

Array of Folders.

#### Defined in

[src/utils.ts:39](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/utils.ts#L39)

___

### fromDriveIterator

▸ **fromDriveIterator**\<`T`\>(`iterator`, `limit?`): `T`[]

Produces an array out of a DriveApp iterator (Files or Folders).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`DriveItem`](modules.md#driveitem) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `iterator` | [`DriveItemIterator`](modules.md#driveitemiterator)\<`T`\> | DriveApp iterator. |
| `limit?` | `number` | Number of item to read. |

#### Returns

`T`[]

Array of items.

#### Defined in

[src/utils.ts:9](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/utils.ts#L9)

___

### getFiles

▸ **getFiles**(`folderId?`): `File`[]

Gets an array of files from a given folder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `folderId?` | `string` | Id of the folder to read. |

#### Returns

`File`[]

Array of Files.

#### Defined in

[src/utils.ts:49](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/utils.ts#L49)

___

### getFolders

▸ **getFolders**(`folderId?`): `Folder`[]

Gets an array of folders from a given folder.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `folderId?` | `string` | Id of the folder to read. |

#### Returns

`Folder`[]

Array of Folders.

#### Defined in

[src/utils.ts:25](https://github.com/gasstack/gasstack/blob/d1294ec/packages/fs/src/utils.ts#L25)

[@gasstack/db](README.md) / Exports

# @gasstack/db

## Table of contents

### Type Aliases

- [ColumnDef](modules.md#columndef)
- [ColumnDefKind](modules.md#columndefkind)
- [ColumnDefVariant](modules.md#columndefvariant)
- [ColumnValueType](modules.md#columnvaluetype)
- [ColumnValueTypeName](modules.md#columnvaluetypename)
- [ColumnValueTypeNames](modules.md#columnvaluetypenames)
- [ColumnsMapping](modules.md#columnsmapping)
- [ContextMetadataStore](modules.md#contextmetadatastore)
- [ContextRef](modules.md#contextref)
- [DataRangeDescriptor](modules.md#datarangedescriptor)
- [FormulaColumnDef](modules.md#formulacolumndef)
- [Link](modules.md#link)
- [LinkAllowedSchema](modules.md#linkallowedschema)
- [ManagedContextGroup](modules.md#managedcontextgroup)
- [ManagedContextRef](modules.md#managedcontextref)
- [NewRowObject](modules.md#newrowobject)
- [PropOfTypeNames](modules.md#propoftypenames)
- [PropOfVariantNames](modules.md#propofvariantnames)
- [RangeHeaders](modules.md#rangeheaders)
- [ReadOnlyColumnDef](modules.md#readonlycolumndef)
- [RowObject](modules.md#rowobject)
- [SerialColumnDef](modules.md#serialcolumndef)
- [UpdateRowObject](modules.md#updaterowobject)

### Functions

- [add](modules.md#add)
- [boolean](modules.md#boolean)
- [commit](modules.md#commit)
- [count](modules.md#count)
- [createContext](modules.md#createcontext)
- [createEntity](modules.md#createentity)
- [createManagedContext](modules.md#createmanagedcontext)
- [createManagedContextGroup](modules.md#createmanagedcontextgroup)
- [dateTime](modules.md#datetime)
- [deleteAt](modules.md#deleteat)
- [entityFromRow](modules.md#entityfromrow)
- [formula](modules.md#formula)
- [hyperLink](modules.md#hyperlink)
- [insertAt](modules.md#insertat)
- [list](modules.md#list)
- [numeric](modules.md#numeric)
- [read](modules.md#read)
- [readonly](modules.md#readonly)
- [refresh](modules.md#refresh)
- [remove](modules.md#remove)
- [rollback](modules.md#rollback)
- [rowFromEntity](modules.md#rowfromentity)
- [seqCurrent](modules.md#seqcurrent)
- [seqNext](modules.md#seqnext)
- [seqReset](modules.md#seqreset)
- [serial](modules.md#serial)
- [text](modules.md#text)
- [updateAt](modules.md#updateat)

## Type Aliases

### ColumnDef

Ƭ **ColumnDef**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `generated?` | `boolean` |
| `id` | `number` \| `string` |
| `type` | [`ColumnValueTypeName`](modules.md#columnvaluetypename)\<`T`\> |

#### Defined in

[src/schema.ts:37](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L37)

___

### ColumnDefKind

Ƭ **ColumnDefKind**: [`ColumnDef`](modules.md#columndef)\<[`ColumnValueType`](modules.md#columnvaluetype)\>

#### Defined in

[src/schema.ts:42](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L42)

___

### ColumnDefVariant

Ƭ **ColumnDefVariant**\<`T`\>: [`ColumnDef`](modules.md#columndef)\<`T`\> \| [`ReadOnlyColumnDef`](modules.md#readonlycolumndef)\<`T`\> \| [`FormulaColumnDef`](modules.md#formulacolumndef)\<`T`\> \| [`SerialColumnDef`](modules.md#serialcolumndef)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Defined in

[src/schema.ts:57](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L57)

___

### ColumnValueType

Ƭ **ColumnValueType**: [`Link`](modules.md#link) \| `string` \| `number` \| `boolean` \| `Date` \| ``null``

#### Defined in

[src/schema.ts:16](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L16)

___

### ColumnValueTypeName

Ƭ **ColumnValueTypeName**\<`T`\>: `T` extends [`Link`](modules.md#link) ? ``"link"`` : `T` extends `string` ? ``"string"`` : `T` extends `number` ? ``"number"`` : `T` extends `boolean` ? ``"boolean"`` : `T` extends `Date` ? ``"date"`` : `never`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Defined in

[src/schema.ts:25](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L25)

___

### ColumnValueTypeNames

Ƭ **ColumnValueTypeNames**: ``"link"`` \| ``"string"`` \| ``"number"`` \| ``"boolean"`` \| ``"date"``

#### Defined in

[src/schema.ts:18](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L18)

___

### ColumnsMapping

Ƭ **ColumnsMapping**: `Object`

#### Index signature

▪ [key: `string`]: [`ColumnDefKind`](modules.md#columndefkind)

#### Defined in

[src/schema.ts:78](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L78)

___

### ContextMetadataStore

Ƭ **ContextMetadataStore**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `get` | (`key`: `string`) => `string` |
| `set` | (`key`: `string`, `value`: `string`) => `void` |

#### Defined in

[src/context.ts:36](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L36)

___

### ContextRef

Ƭ **ContextRef**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `[dispose]` | () => `void` |
| `__brand` | ``"ContextRef<T>"`` |

#### Defined in

[src/context.ts:41](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L41)

___

### DataRangeDescriptor

Ƭ **DataRangeDescriptor**: \{ `sheetName`: `string`  } \| \{ `rangeName`: `string`  } \| \{ `a1NotationRange`: `string`  }

#### Defined in

[src/context.ts:31](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L31)

___

### FormulaColumnDef

Ƭ **FormulaColumnDef**\<`T`\>: [`ReadOnlyColumnDef`](modules.md#readonlycolumndef)\<`T`\> & \{ `formula`: ``true``  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Defined in

[src/schema.ts:47](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L47)

___

### Link

Ƭ **Link**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `label?` | `string` |
| `url` | \`$\{LinkAllowedSchema}://$\{string}\` |

#### Defined in

[src/schema.ts:11](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L11)

___

### LinkAllowedSchema

Ƭ **LinkAllowedSchema**: ``"http"`` \| ``"https"`` \| ``"mailto"`` \| ``"aim"`` \| ``"ftp"`` \| ``"gopher"`` \| ``"telnet"`` \| ``"news"``

#### Defined in

[src/schema.ts:1](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L1)

___

### ManagedContextGroup

Ƭ **ManagedContextGroup**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `addContext` | (`ctx`: [`ManagedContextRef`](modules.md#managedcontextref)\<`any`\>) => `void` |
| `commit` | () => `void` |
| `removeContext` | (`ctx`: [`ManagedContextRef`](modules.md#managedcontextref)\<`any`\>) => `void` |
| `rollback` | () => `void` |

#### Defined in

[src/managed-context.ts:221](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L221)

___

### ManagedContextRef

Ƭ **ManagedContextRef**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `[dispose]` | () => `void` |
| `__brand` | ``"ManagedContextRef<T>"`` |

#### Defined in

[src/managed-context.ts:19](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L19)

___

### NewRowObject

Ƭ **NewRowObject**\<`T`\>: `T` extends [`ColumnsMapping`](modules.md#columnsmapping) ? \{ [K in Exclude\<keyof T, PropOfVariantNames\<T, ReadOnlyColumnDef\<any\>\>\>]: ColumnDefValueType\<K, T\> } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/core.ts:22](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/core.ts#L22)

___

### PropOfTypeNames

Ƭ **PropOfTypeNames**\<`T`, `P`\>: \{ [K in keyof T]: T[K] extends ColumnDefVariant\<infer V\> ? V extends P ? K : never : never }[keyof `T`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |
| `P` | `P` |

#### Defined in

[src/schema.ts:63](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L63)

___

### PropOfVariantNames

Ƭ **PropOfVariantNames**\<`T`, `P`\>: \{ [K in keyof T]: T[K] extends P ? K : never }[keyof `T`]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |
| `P` | extends [`ColumnDefVariant`](modules.md#columndefvariant)\<`any`\> |

#### Defined in

[src/schema.ts:71](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L71)

___

### RangeHeaders

Ƭ **RangeHeaders**: `Object`

#### Index signature

▪ [key: `string`]: `number`

#### Defined in

[src/core.ts:35](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/core.ts#L35)

___

### ReadOnlyColumnDef

Ƭ **ReadOnlyColumnDef**\<`T`\>: [`ColumnDef`](modules.md#columndef)\<`T`\> & \{ `readonly`: ``true``  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Defined in

[src/schema.ts:44](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L44)

___

### RowObject

Ƭ **RowObject**\<`T`\>: `T` extends [`ColumnsMapping`](modules.md#columnsmapping) ? \{ [K in keyof T]: ColumnDefValueType\<K, T\> } : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/core.ts:16](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/core.ts#L16)

___

### SerialColumnDef

Ƭ **SerialColumnDef**\<`T`\>: [`ReadOnlyColumnDef`](modules.md#readonlycolumndef)\<`T`\> & \{ `genFn?`: (`p`: `number`) => `T` ; `serial`: ``true``  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Defined in

[src/schema.ts:51](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L51)

___

### UpdateRowObject

Ƭ **UpdateRowObject**\<`T`\>: `T` extends [`ColumnsMapping`](modules.md#columnsmapping) ? `Partial`\<[`NewRowObject`](modules.md#newrowobject)\<`T`\>\> : `never`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/core.ts:31](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/core.ts#L31)

## Functions

### add

▸ **add**\<`T`\>(`ctx`, `item`, `index?`): [`RowObject`](modules.md#rowobject)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\> | Managed context reference. |
| `item` | [`NewRowObject`](modules.md#newrowobject)\<`T`\> | Item to be added. |
| `index?` | `number` | Insertion index. Otherwise the row is appended. |

#### Returns

[`RowObject`](modules.md#rowobject)\<`T`\>

Managed added entity.

#### Defined in

[src/managed-context.ts:111](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L111)

___

### boolean

▸ **boolean**(`id`): [`ColumnDef`](modules.md#columndef)\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

[`ColumnDef`](modules.md#columndef)\<`boolean`\>

#### Defined in

[src/schema.ts:115](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L115)

___

### commit

▸ **commit**\<`T`\>(`ctx`): `void`

Confirms and persists every CRUD operation performed on the context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\> | Managed context reference. |

#### Returns

`void`

#### Defined in

[src/managed-context.ts:199](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L199)

___

### count

▸ **count**\<`T`\>(`ctx`): `number`

Returns the table size.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | Context reference. |

#### Returns

`number`

The number of rows of the table.

#### Defined in

[src/context.ts:185](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L185)

___

### createContext

▸ **createContext**\<`T`\>(`spreadsheet`, `range`, `columns`, `metadata?`): [`ContextRef`](modules.md#contextref)\<`T`\>

Creates a table mapped context given a spreadsheet and a range in it. If the schema definition contains string mappings,
the first row is used as an header row. If the schema contains formula mapping, the row below the header (if present)
is used to read the expected formulas and copy them on te future added rows.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `spreadsheet` | `Spreadsheet` | Google Spreadsheet to use |
| `range` | [`DataRangeDescriptor`](modules.md#datarangedescriptor) | Range of the table. Could be an entire sheet, a named range or an A1Notation range. |
| `columns` | [`ColumnsMapping`](modules.md#columnsmapping) | Schema definition of the mapped table. |
| `metadata?` | [`ContextMetadataStore`](modules.md#contextmetadatastore) | Context metadata store, used for internal operations (eg.: sequences, indexes). Defaults to a ScriptProperties. |

#### Returns

[`ContextRef`](modules.md#contextref)\<`T`\>

Disposable reference of a typed Context handle.

#### Defined in

[src/context.ts:56](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L56)

___

### createEntity

▸ **createEntity**\<`T`\>(`item`): `Entity`\<`T`\>

Create a managed object able to provide a copy on write semantic to a mapped object row.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `item` | [`RowObject`](modules.md#rowobject)\<`T`\> | Mapped row object. |

#### Returns

`Entity`\<`T`\>

Managed entity object.

#### Defined in

[src/managed-context.ts:44](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L44)

___

### createManagedContext

▸ **createManagedContext**\<`T`\>(`ctx`): [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\>

Create a managed context wrapping a table context able to provide copy on write semantics
to the read rows and transaction-like batch operations.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | Context reference. |

#### Returns

[`ManagedContextRef`](modules.md#managedcontextref)\<`T`\>

Managed context reference.

#### Defined in

[src/managed-context.ts:94](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L94)

___

### createManagedContextGroup

▸ **createManagedContextGroup**(`...params`): [`ManagedContextGroup`](modules.md#managedcontextgroup)

Creates an handler able to control the commit/rollback operations of multiple managed contexts.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `...params` | [`ManagedContextRef`](modules.md#managedcontextref)\<`any`\>[] | Managed context references. |

#### Returns

[`ManagedContextGroup`](modules.md#managedcontextgroup)

A multiple transaction-like batch operation handler.

#### Defined in

[src/managed-context.ts:233](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L233)

___

### dateTime

▸ **dateTime**(`id`): [`ColumnDef`](modules.md#columndef)\<`Date`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

[`ColumnDef`](modules.md#columndef)\<`Date`\>

#### Defined in

[src/schema.ts:119](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L119)

___

### deleteAt

▸ **deleteAt**\<`T`\>(`ctx`, `index`, `count?`): `void`

Remove item(s) from the table.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | `undefined` | Context reference. |
| `index` | `number` | `undefined` | Start index from which to remove. |
| `count` | `number` | `1` | Number of items to be removed. |

#### Returns

`void`

#### Defined in

[src/context.ts:266](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L266)

___

### entityFromRow

▸ **entityFromRow**\<`T`\>(`row`, `columns`, `headers?`): [`RowObject`](modules.md#rowobject)\<`T`\>

Creates an object respecting the given T schema using the values from a row array.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `row` | [`ColumnValueType`](modules.md#columnvaluetype)[] | Array of values representing a table row. |
| `columns` | [`ColumnsMapping`](modules.md#columnsmapping) | Schema definition of the mapped table. |
| `headers` | [`RangeHeaders`](modules.md#rangeheaders) | Headers row used to find the correct column indexes. |

#### Returns

[`RowObject`](modules.md#rowobject)\<`T`\>

Object of type T with the correct values.

#### Defined in

[src/core.ts:44](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/core.ts#L44)

___

### formula

▸ **formula**\<`T`\>(`def`): [`FormulaColumnDef`](modules.md#formulacolumndef)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `def` | [`ColumnDef`](modules.md#columndef)\<`T`\> |

#### Returns

[`FormulaColumnDef`](modules.md#formulacolumndef)\<`T`\>

#### Defined in

[src/schema.ts:88](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L88)

___

### hyperLink

▸ **hyperLink**(`id`): [`ColumnDef`](modules.md#columndef)\<[`Link`](modules.md#link)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

[`ColumnDef`](modules.md#columndef)\<[`Link`](modules.md#link)\>

#### Defined in

[src/schema.ts:123](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L123)

___

### insertAt

▸ **insertAt**\<`T`\>(`ctx`, `inserts`, `index`, `append?`): [`RowObject`](modules.md#rowobject)\<`T`\>[]

Ineserts item(s) in the table.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | Context reference |
| `inserts` | [`NewRowObject`](modules.md#newrowobject)\<`T`\> \| [`NewRowObject`](modules.md#newrowobject)\<`T`\>[] | Single mapped row object or an array of mapped row objects to be inserted. |
| `index` | `number` | Start index of insertion. |
| `append?` | `boolean` | If true the insertion happen below the given index and not at the given index. |

#### Returns

[`RowObject`](modules.md#rowobject)\<`T`\>[]

Inserted row(s) with the computed or generated values correctly assigned.

#### Defined in

[src/context.ts:198](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L198)

___

### list

▸ **list**\<`T`\>(`ctx`): [`RowObject`](modules.md#rowobject)\<`T`\>[]

Returns the current table items as managed items.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\> | Managed context reference. |

#### Returns

[`RowObject`](modules.md#rowobject)\<`T`\>[]

An array of managed items.

#### Defined in

[src/managed-context.ts:154](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L154)

___

### numeric

▸ **numeric**(`id`): [`ColumnDef`](modules.md#columndef)\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

[`ColumnDef`](modules.md#columndef)\<`number`\>

#### Defined in

[src/schema.ts:111](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L111)

___

### read

▸ **read**\<`T`\>(`ctx`, `offset?`, `limit?`): [`RowObject`](modules.md#rowobject)\<`T`\>[]

Reads the mapped table.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | `undefined` | Context reference |
| `offset` | `number` | `0` | Number of rows to skip |
| `limit?` | `number` | `undefined` | Number of rows to return. |

#### Returns

[`RowObject`](modules.md#rowobject)\<`T`\>[]

Array of mapped row objects.

#### Defined in

[src/context.ts:148](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L148)

___

### readonly

▸ **readonly**\<`T`\>(`def`): [`ReadOnlyColumnDef`](modules.md#readonlycolumndef)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `def` | [`ColumnDef`](modules.md#columndef)\<`T`\> |

#### Returns

[`ReadOnlyColumnDef`](modules.md#readonlycolumndef)\<`T`\>

#### Defined in

[src/schema.ts:82](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L82)

___

### refresh

▸ **refresh**\<`T`\>(`ctx`): `void`

Reloads the items from the sheet.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\> | Managed context reference. |

#### Returns

`void`

#### Defined in

[src/managed-context.ts:167](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L167)

___

### remove

▸ **remove**\<`T`\>(`ctx`, `item`): `void`

Removes a managed item from the table.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\> | Managed context reference. |
| `item` | [`RowObject`](modules.md#rowobject)\<`T`\> | Item to be removed. |

#### Returns

`void`

#### Defined in

[src/managed-context.ts:136](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L136)

___

### rollback

▸ **rollback**\<`T`\>(`ctx`): `void`

Undo every CRUD operation performed on the context.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ManagedContextRef`](modules.md#managedcontextref)\<`T`\> | Managed context reference. |

#### Returns

`void`

#### Defined in

[src/managed-context.ts:179](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/managed-context.ts#L179)

___

### rowFromEntity

▸ **rowFromEntity**\<`T`\>(`entity`, `columns`, `headers?`): [`ColumnValueType`](modules.md#columnvaluetype)[]

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `entity` | `Partial`\<[`RowObject`](modules.md#rowobject)\<`T`\>\> | Object satisfying the schema definition. |
| `columns` | [`ColumnsMapping`](modules.md#columnsmapping) | Schema definition of the mapped table. |
| `headers` | [`RangeHeaders`](modules.md#rangeheaders) | Headers row used to find the correct column indexes. |

#### Returns

[`ColumnValueType`](modules.md#columnvaluetype)[]

Creates a row array with values taken from an boject respecting the schema definition, positioned at the correct indexes.

#### Defined in

[src/core.ts:77](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/core.ts#L77)

___

### seqCurrent

▸ **seqCurrent**\<`T`\>(`ctx`, `key`): `number` \| ``null``

Gets the current value of the sequence.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | Context reference. |
| `key` | [`PropOfVariantNames`](modules.md#propofvariantnames)\<`T`, [`SerialColumnDef`](modules.md#serialcolumndef)\<`any`\>\> | Name of the field sequence. |

#### Returns

`number` \| ``null``

Current value of the sequence.

#### Defined in

[src/sequences.ts:26](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/sequences.ts#L26)

___

### seqNext

▸ **seqNext**\<`T`\>(`ctx`, `key`): `number`

Increment the value of the sequence and returns it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | Context reference. |
| `key` | [`PropOfVariantNames`](modules.md#propofvariantnames)\<`T`, [`SerialColumnDef`](modules.md#serialcolumndef)\<`any`\>\> | Name of the field sequence. |

#### Returns

`number`

Current value of the sequence.

#### Defined in

[src/sequences.ts:41](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/sequences.ts#L41)

___

### seqReset

▸ **seqReset**\<`T`\>(`ctx`, `key`, `value?`): `void`

Resets the value of the sequence to a given value and returns it.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | `undefined` | Gets the current value of the sequence. |
| `key` | [`PropOfVariantNames`](modules.md#propofvariantnames)\<`T`, [`SerialColumnDef`](modules.md#serialcolumndef)\<`any`\>\> | `undefined` | Name of the field sequence. |
| `value` | `number` | `0` | Value to which reset the sequence. |

#### Returns

`void`

Current value of the sequence.

#### Defined in

[src/sequences.ts:61](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/sequences.ts#L61)

___

### serial

▸ **serial**\<`T`\>(`def`, `genFn?`): [`SerialColumnDef`](modules.md#serialcolumndef)\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnValueType`](modules.md#columnvaluetype) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `def` | [`ColumnDef`](modules.md#columndef)\<`T`\> |
| `genFn?` | (`p`: `number`) => `T` |

#### Returns

[`SerialColumnDef`](modules.md#serialcolumndef)\<`T`\>

#### Defined in

[src/schema.ts:94](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L94)

___

### text

▸ **text**(`id`): [`ColumnDef`](modules.md#columndef)\<`string`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` \| `number` |

#### Returns

[`ColumnDef`](modules.md#columndef)\<`string`\>

#### Defined in

[src/schema.ts:107](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/schema.ts#L107)

___

### updateAt

▸ **updateAt**\<`T`\>(`ctx`, `updates`, `index`): [`RowObject`](modules.md#rowobject)\<`T`\>[]

Updates item(s) of a table.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ColumnsMapping`](modules.md#columnsmapping) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `ctx` | [`ContextRef`](modules.md#contextref)\<`T`\> | Context reference. |
| `updates` | [`UpdateRowObject`](modules.md#updaterowobject)\<`T`\> \| [`UpdateRowObject`](modules.md#updaterowobject)\<`T`\>[] | Single mapped row object or an array of mapped row objects to be updated. |
| `index` | `number` | Start index of update. |

#### Returns

[`RowObject`](modules.md#rowobject)\<`T`\>[]

Updated row(s) with the computed or generated values correctly assigned.

#### Defined in

[src/context.ts:286](https://github.com/gasstack/gasstack/blob/56a168b/packages/db/src/context.ts#L286)

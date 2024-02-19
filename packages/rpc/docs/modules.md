[@gasstack/rpc](README.md) / Exports

# @gasstack/rpc

## Table of contents

### Interfaces

- [Run](interfaces/Run.md)

### Type Aliases

- [ClientApi](modules.md#clientapi)
- [ClientRunMethods](modules.md#clientrunmethods)
- [History](modules.md#history)
- [HistoryChangeEvent](modules.md#historychangeevent)
- [HistoryChangeEventHandler](modules.md#historychangeeventhandler)
- [Host](modules.md#host)
- [Location](modules.md#location)
- [MockRunMethods](modules.md#mockrunmethods)
- [RpcClientProxy](modules.md#rpcclientproxy)
- [RpcEndpoint](modules.md#rpcendpoint)
- [RpcParamType](modules.md#rpcparamtype)
- [RpcReturnType](modules.md#rpcreturntype)
- [RpcValueType](modules.md#rpcvaluetype)
- [RpcValueTypeArray](modules.md#rpcvaluetypearray)
- [RpcValueTypeObject](modules.md#rpcvaluetypeobject)
- [RunFailureFn](modules.md#runfailurefn)
- [RunSuccessFn](modules.md#runsuccessfn)
- [ScopedMocksRecord](modules.md#scopedmocksrecord)
- [ServerRunMethods](modules.md#serverrunmethods)
- [Url](modules.md#url)

### Functions

- [createClient](modules.md#createclient)
- [createEndpoint](modules.md#createendpoint)
- [createScopedClient](modules.md#createscopedclient)
- [delayedFailure](modules.md#delayedfailure)
- [delayedSuccess](modules.md#delayedsuccess)
- [include](modules.md#include)
- [setupMocks](modules.md#setupmocks)

## Type Aliases

### ClientApi

Ƭ **ClientApi**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ClientRunMethods`](modules.md#clientrunmethods) = {} |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `script` | \{ `history`: [`History`](modules.md#history) ; `host`: [`Host`](modules.md#host) ; `run`: [`Run`](interfaces/Run.md) & `T` ; `url`: [`Url`](modules.md#url)  } |
| `script.history` | [`History`](modules.md#history) |
| `script.host` | [`Host`](modules.md#host) |
| `script.run` | [`Run`](interfaces/Run.md) & `T` |
| `script.url` | [`Url`](modules.md#url) |

#### Defined in

[src/types.ts:148](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L148)

___

### ClientRunMethods

Ƭ **ClientRunMethods**: `Object`

#### Index signature

▪ [key: `string`]: (...`params`: [`RpcParamType`](modules.md#rpcparamtype)[]) => `void` \| (`form`: `HTMLFormElement`) => `void`

#### Defined in

[src/types.ts:142](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L142)

___

### History

Ƭ **History**: `Object`

Asynchronous client-side JavaScript API that can interact with the browser history stack. It can only be used in the context of a web app that uses IFRAME. It is not intended for use with sidebars and dialogs in an add-on or container-script context.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `push` | (`state`: `object`, `params`: \{ `[key: string]`: `string` \| `string`[];  }, `hash`: `string`) => `void` |
| `replace` | (`state`: `object`, `params`: \{ `[key: string]`: `string` \| `string`[];  }, `hash`: `string`) => `void` |
| `setChangeHandler` | (`fn`: [`HistoryChangeEventHandler`](modules.md#historychangeeventhandler)) => `void` |

#### Defined in

[src/types.ts:41](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L41)

___

### HistoryChangeEvent

Ƭ **HistoryChangeEvent**: `Object`

Event describing the changes in the browser history.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `location` | [`Location`](modules.md#location) | A location object associated with the popped event. |
| `state` | `object` | The state object associated with the popped event. This object is identical to the state object that used in the corresponding push() or replace() method that added the popped state to the history stack. |

#### Defined in

[src/types.ts:22](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L22)

___

### HistoryChangeEventHandler

Ƭ **HistoryChangeEventHandler**: (`e`: [`HistoryChangeEvent`](modules.md#historychangeevent)) => `void`

Callback function to respond to changes in the browser history.

#### Type declaration

▸ (`e`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `e` | [`HistoryChangeEvent`](modules.md#historychangeevent) |

##### Returns

`void`

#### Defined in

[src/types.ts:36](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L36)

___

### Host

Ƭ **Host**: `Object`

Asynchronous client-side JavaScript API that can interact with dialogs or sidebars in Google Docs, Sheets, or Forms that contain HTML-service pages.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `editor` | \{ `focus`: () => `void`  } | Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor. |
| `editor.focus` | [object Object] | Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor. |
| `origin` | `string` | Provides the host domain, so scripts can set their origin correctly. |
| `close` | () => `void` | Closes the current dialog or sidebar. |
| `setHeight` | (`value`: `number`) => `void` | Sets the height of the current dialog. |
| `setWidth` | (`value`: `number`) => `void` | Sets the width of the current dialog. |

#### Defined in

[src/types.ts:74](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L74)

___

### Location

Ƭ **Location**: `Object`

A location object associated with the current navigation state.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `hash` | `string` | The string value of URL fragment after the # character, or an empty string if no URL fragment is present |
| `parameter` | \{ `[key: string]`: `string`;  } | An object of key/value pairs that correspond to the URL request parameters. Only the first value will be returned for parameters that have multiple values. If no parameters are present, this will be an empty object. |
| `parameters` | \{ `[key: string]`: `string`[];  } | An object similar to location.parameter, but with an array of values for each key. If no parameters are present, this will be an empty object. |

#### Defined in

[src/types.ts:4](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L4)

___

### MockRunMethods

Ƭ **MockRunMethods**\<`T`\>: \{ [P in keyof T]: Function }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ClientRunMethods`](modules.md#clientrunmethods) |

#### Defined in

[src/mocking.ts:48](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/mocking.ts#L48)

___

### RpcClientProxy

Ƭ **RpcClientProxy**\<`T`\>: \{ [P in keyof T]: Function } & \{ [P in keyof T & string as \`ctx\_$\{P}\`]: Function }

Client proxy object. Provides a couple of methods for each server enpoint method of the provided descriptor.
The first method has the same API as the descriptor, the second has a prefix "ctx_" prepended and expects a context
argument as the first parameter of the function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ServerRunMethods`](modules.md#serverrunmethods) |

#### Defined in

[src/client.ts:8](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/client.ts#L8)

___

### RpcEndpoint

Ƭ **RpcEndpoint**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `invoke` | (`name`: `string`, ...`params`: `any`[]) => `any` |

#### Defined in

[src/server.ts:20](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/server.ts#L20)

___

### RpcParamType

Ƭ **RpcParamType**: [`RpcValueType`](modules.md#rpcvaluetype) \| [`RpcValueTypeArray`](modules.md#rpcvaluetypearray) \| [`RpcValueTypeObject`](modules.md#rpcvaluetypeobject)

#### Defined in

[src/types.ts:169](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L169)

___

### RpcReturnType

Ƭ **RpcReturnType**: [`RpcValueType`](modules.md#rpcvaluetype) \| [`RpcValueTypeArray`](modules.md#rpcvaluetypearray) \| [`RpcValueTypeObject`](modules.md#rpcvaluetypeobject) \| `void`

#### Defined in

[src/types.ts:173](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L173)

___

### RpcValueType

Ƭ **RpcValueType**: `number` \| `boolean` \| `string` \| ``null``

#### Defined in

[src/types.ts:163](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L163)

___

### RpcValueTypeArray

Ƭ **RpcValueTypeArray**: [`RpcValueType`](modules.md#rpcvaluetype)[]

#### Defined in

[src/types.ts:164](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L164)

___

### RpcValueTypeObject

Ƭ **RpcValueTypeObject**: `Object`

#### Index signature

▪ [key: `string`]: [`RpcValueType`](modules.md#rpcvaluetype) \| [`RpcValueTypeArray`](modules.md#rpcvaluetypearray) \| [`RpcValueTypeObject`](modules.md#rpcvaluetypeobject)

#### Defined in

[src/types.ts:165](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L165)

___

### RunFailureFn

Ƭ **RunFailureFn**: (`error`: `Error`, `userObject?`: `object`) => `void`

Callback function to run if the server-side function throws an exception.

#### Type declaration

▸ (`error`, `userObject?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `Error` |
| `userObject?` | `object` |

##### Returns

`void`

#### Defined in

[src/types.ts:118](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L118)

___

### RunSuccessFn

Ƭ **RunSuccessFn**: (`result`: [`RpcReturnType`](modules.md#rpcreturntype), `userObject?`: `object`) => `void`

Callback function to run if the server-side function returns successfully.

#### Type declaration

▸ (`result`, `userObject?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `result` | [`RpcReturnType`](modules.md#rpcreturntype) |
| `userObject?` | `object` |

##### Returns

`void`

#### Defined in

[src/types.ts:122](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L122)

___

### ScopedMocksRecord

Ƭ **ScopedMocksRecord**: `Object`

#### Index signature

▪ [key: `string`]: [`MockRunMethods`](modules.md#mockrunmethods)\<`any`\>

#### Defined in

[src/mocking.ts:52](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/mocking.ts#L52)

___

### ServerRunMethods

Ƭ **ServerRunMethods**: `Object`

#### Index signature

▪ [key: `string`]: (...`params`: [`RpcParamType`](modules.md#rpcparamtype)[]) => [`RpcReturnType`](modules.md#rpcreturntype) \| (`form`: `HTMLFormElement`) => [`RpcReturnType`](modules.md#rpcreturntype)

#### Defined in

[src/types.ts:157](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L157)

___

### Url

Ƭ **Url**: `Object`

Asynchronous client-side JavaScript API that can query URLs to obtain the current URL parameters and fragment. This API supports the google.script.history API. It can only be used in the context of a web app that uses IFRAME. It is not intended for use with sidebars and dialogs in an add-on or container-script context.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `getLocation` | (`fn`: (`e`: [`Location`](modules.md#location)) => `void`) => `void` |

#### Defined in

[src/types.ts:107](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L107)

## Functions

### createClient

▸ **createClient**\<`T`\>(): [`RpcClientProxy`](modules.md#rpcclientproxy)\<`T`\>

Create a proxy client for the global object of the Google Apps Script application.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ServerRunMethods`](modules.md#serverrunmethods) |

#### Returns

[`RpcClientProxy`](modules.md#rpcclientproxy)\<`T`\>

RPC proxy client.

#### Defined in

[src/client.ts:23](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/client.ts#L23)

___

### createEndpoint

▸ **createEndpoint**\<`T`\>(`methods`): [`RpcEndpoint`](modules.md#rpcendpoint)

Creates an RPC enpoint.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ServerRunMethods`](modules.md#serverrunmethods) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `methods` | `T` | Endpoint descriptor. |

#### Returns

[`RpcEndpoint`](modules.md#rpcendpoint)

Rpc endpoint able to invoke the configured functions.

#### Defined in

[src/server.ts:29](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/server.ts#L29)

___

### createScopedClient

▸ **createScopedClient**\<`T`\>(`scopingFnName`): [`RpcClientProxy`](modules.md#rpcclientproxy)\<`T`\>

Create a proxy client which uses a specific "scoping" function to invoke the endpoint methods.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ServerRunMethods`](modules.md#serverrunmethods) |

#### Parameters

| Name | Type |
| :------ | :------ |
| `scopingFnName` | `string` |

#### Returns

[`RpcClientProxy`](modules.md#rpcclientproxy)\<`T`\>

RPC proxy client.

#### Defined in

[src/client.ts:55](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/client.ts#L55)

___

### delayedFailure

▸ **delayedFailure**(`millis`, `error`): `Promise`\<`Error`\>

Produce a promise, rejecting with a given error after a specific amount of time or a random time in an interval.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `millis` | `number` \| [min: number, max: number] | Specific delay or range. |
| `error` | `Error` | Value of the resolved promise. |

#### Returns

`Promise`\<`Error`\>

Promise to be rejected.

#### Defined in

[src/mocking.ts:230](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/mocking.ts#L230)

___

### delayedSuccess

▸ **delayedSuccess**\<`T`\>(`millis`, `value?`): `Promise`\<`T` \| `undefined`\>

Produce a promise, resolving a given value after a specific amount of time or a random time in an interval.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `millis` | `number` \| [min: number, max: number] | Specific delay or range. |
| `value?` | `T` | Value of the resolved promise. |

#### Returns

`Promise`\<`T` \| `undefined`\>

Promise to be resolved.

#### Defined in

[src/mocking.ts:210](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/mocking.ts#L210)

___

### include

▸ **include**(`filename`, `params?`): `string`

Allows the inclusion of an html file inside a template. Example: <?!= include("data/test", {id:3}) ?>

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `filename` | `string` | File to be included. |
| `params?` | `Object` | Parameters for the included template. |

#### Returns

`string`

HTML to be rendered.

#### Defined in

[src/server.ts:9](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/server.ts#L9)

___

### setupMocks

▸ **setupMocks**\<`T`, `C`\>(`globalMock`, `scopedMocks?`): [`ClientApi`](modules.md#clientapi)\<`T` & \{ [K in string \| number \| symbol]: Function }\>

Create an RPC endpoint mock and initilize the global window object in order to behave as close as possible to the real
RPC Google Apps Script proxy.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ClientRunMethods`](modules.md#clientrunmethods) |
| `C` | extends [`ScopedMocksRecord`](modules.md#scopedmocksrecord) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `globalMock` | [`MockRunMethods`](modules.md#mockrunmethods)\<`T`\> | Global scope function mocking descriptor. |
| `scopedMocks?` | `C` | Function scoped function mocking descriptor. |

#### Returns

[`ClientApi`](modules.md#clientapi)\<`T` & \{ [K in string \| number \| symbol]: Function }\>

The typed window.google proxy to use. It is just a convenience handle, given the fact that the real window.google object is modified.

#### Defined in

[src/mocking.ts:61](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/mocking.ts#L61)

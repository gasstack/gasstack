[@gasstack/http](README.md) / Exports

# @gasstack/http

## Table of contents

### References

- [default](modules.md#default)

### Type Aliases

- [Application](modules.md#application)
- [ApplicationBuilder](modules.md#applicationbuilder)
- [ApplicationBuilderFn](modules.md#applicationbuilderfn)
- [HttpOutput](modules.md#httpoutput)
- [HttpRequest](modules.md#httprequest)
- [HttpResponse](modules.md#httpresponse)
- [HttpResponseHelper](modules.md#httpresponsehelper)
- [MiddlewareFn](modules.md#middlewarefn)
- [PathParams](modules.md#pathparams)
- [RouteHandler](modules.md#routehandler)
- [ViewParams](modules.md#viewparams)

### Functions

- [appBuilder](modules.md#appbuilder)
- [installHttpApp](modules.md#installhttpapp)
- [respond](modules.md#respond)

## References

### default

Renames and re-exports [appBuilder](modules.md#appbuilder)

## Type Aliases

### Application

Ƭ **Application**: (`request`: [`HttpRequest`](modules.md#httprequest)) => [`HttpOutput`](modules.md#httpoutput)

#### Type declaration

▸ (`request`): [`HttpOutput`](modules.md#httpoutput)

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`HttpRequest`](modules.md#httprequest) |

##### Returns

[`HttpOutput`](modules.md#httpoutput)

#### Defined in

[src/types.ts:27](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L27)

___

### ApplicationBuilder

Ƭ **ApplicationBuilder**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `all` | (`match`: `string`, `fn`: [`RouteHandler`](modules.md#routehandler)) => [`ApplicationBuilder`](modules.md#applicationbuilder) |
| `get` | (`match`: `string`, `fn`: [`RouteHandler`](modules.md#routehandler)) => [`ApplicationBuilder`](modules.md#applicationbuilder) |
| `post` | (`match`: `string`, `fn`: [`RouteHandler`](modules.md#routehandler)) => [`ApplicationBuilder`](modules.md#applicationbuilder) |
| `use` | (`fn`: [`MiddlewareFn`](modules.md#middlewarefn)) => [`ApplicationBuilder`](modules.md#applicationbuilder) |

#### Defined in

[src/types.ts:20](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L20)

___

### ApplicationBuilderFn

Ƭ **ApplicationBuilderFn**: (`builder`: [`ApplicationBuilder`](modules.md#applicationbuilder)) => `void`

#### Type declaration

▸ (`builder`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`ApplicationBuilder`](modules.md#applicationbuilder) |

##### Returns

`void`

#### Defined in

[src/types.ts:29](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L29)

___

### HttpOutput

Ƭ **HttpOutput**: `GoogleAppsScript.HTML.HtmlOutput` \| `GoogleAppsScript.Content.TextOutput`

#### Defined in

[src/types.ts:6](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L6)

___

### HttpRequest

Ƭ **HttpRequest**: `GoogleAppsScript.Events.DoGet` \| `GoogleAppsScript.Events.DoPost` & \{ `pathParams?`: [`PathParams`](modules.md#pathparams)  }

#### Defined in

[src/types.ts:2](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L2)

___

### HttpResponse

Ƭ **HttpResponse**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `error?` | `string` \| ``null`` |
| `result` | [`HttpOutput`](modules.md#httpoutput) \| ``null`` |

#### Defined in

[src/types.ts:9](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L9)

___

### HttpResponseHelper

Ƭ **HttpResponseHelper**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `download` | (`content`: `string`, `filename`: `string`) => `void` |
| `error` | (`error`: `string`) => `void` |
| `json` | (`content`: `any`) => `void` |
| `ok` | () => `void` |
| `text` | (`content`: `string`) => `void` |
| `view` | (`path`: `string`, `params`: [`ViewParams`](modules.md#viewparams)) => `void` |

#### Defined in

[src/app.ts:148](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/app.ts#L148)

___

### MiddlewareFn

Ƭ **MiddlewareFn**: (`request`: [`HttpRequest`](modules.md#httprequest), `response`: [`HttpResponse`](modules.md#httpresponse)) => `void`

#### Type declaration

▸ (`request`, `response`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `request` | [`HttpRequest`](modules.md#httprequest) |
| `response` | [`HttpResponse`](modules.md#httpresponse) |

##### Returns

`void`

#### Defined in

[src/types.ts:14](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L14)

___

### PathParams

Ƭ **PathParams**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/types.ts:1](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L1)

___

### RouteHandler

Ƭ **RouteHandler**: [`MiddlewareFn`](modules.md#middlewarefn) \| [`MiddlewareFn`](modules.md#middlewarefn)[]

#### Defined in

[src/types.ts:18](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/types.ts#L18)

___

### ViewParams

Ƭ **ViewParams**: `Object`

#### Index signature

▪ [key: `string`]: `any`

#### Defined in

[src/app.ts:147](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/app.ts#L147)

## Functions

### appBuilder

▸ **appBuilder**(`builder`): [`Application`](modules.md#application)

Factory function to configure an http application in an Express.js-like fashion.

#### Parameters

| Name | Type |
| :------ | :------ |
| `builder` | [`ApplicationBuilderFn`](modules.md#applicationbuilderfn) |

#### Returns

[`Application`](modules.md#application)

Http Application.

#### Defined in

[src/app.ts:198](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/app.ts#L198)

___

### installHttpApp

▸ **installHttpApp**(`app`): `void`

Install an app in the Google App Script global scope. It creates both the doGet and doPost handler.
If a handler already exists, the orgiginal handler is wrapped and executed when the http app returns an error.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `app` | [`Application`](modules.md#application) | Http App to be installed. |

#### Returns

`void`

#### Defined in

[index.ts:12](https://github.com/gasstack/gasstack/blob/492813e/packages/http/index.ts#L12)

___

### respond

▸ **respond**(`response`): [`HttpResponseHelper`](modules.md#httpresponsehelper)

Wraps a response object in an helper to produce the deisred response.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `response` | [`HttpResponse`](modules.md#httpresponse) | Return Helper handler to produce an http response. |

#### Returns

[`HttpResponseHelper`](modules.md#httpresponsehelper)

Http response helper/builder object.

#### Defined in

[src/app.ts:162](https://github.com/gasstack/gasstack/blob/492813e/packages/http/src/app.ts#L162)

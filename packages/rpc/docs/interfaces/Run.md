[@gasstack/rpc](../README.md) / [Exports](../modules.md) / Run

# Interface: Run

## Table of contents

### Methods

- [withFailureHandler](Run.md#withfailurehandler)
- [withSuccessHandler](Run.md#withsuccesshandler)
- [withUserObject](Run.md#withuserobject)

## Methods

### withFailureHandler

▸ **withFailureHandler**(`fn`): `this`

Sets a callback function to run if the server-side function throws an exception. The Error object is passed to the function as the first argument, and the user object (if any) is passed as a second argument. Without a failure handler, failures are logged to the JavaScript console. To override this, call withFailureHandler(null) or supply a failure handler that does nothing.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | [`RunFailureFn`](../modules.md#runfailurefn) | Failure handler. |

#### Returns

`this`

#### Defined in

[src/types.ts:129](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L129)

___

### withSuccessHandler

▸ **withSuccessHandler**(`fn`): `this`

Sets a callback function to run if the server-side function returns successfully. The server's return value is passed to the function as the first argument, and the user object (if any) is passed as a second argument.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `fn` | [`RunSuccessFn`](../modules.md#runsuccessfn) | Success handler. |

#### Returns

`this`

#### Defined in

[src/types.ts:134](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L134)

___

### withUserObject

▸ **withUserObject**(`userObject`): `this`

Sets an object to pass as a second parameter to the success and failure handlers. This "user object" — not to be confused with the User class — lets the callback functions respond to the context in which the client contacted the server. Because user objects are not sent to the server, they are not subject to the restrictions on parameters and return values for server calls. User objects cannot, however, be objects constructed with the new operator.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userObject` | `object` | Object to be passed. |

#### Returns

`this`

#### Defined in

[src/types.ts:139](https://github.com/gasstack/gasstack/blob/09ab50f/packages/rpc/src/types.ts#L139)

/**
 * A location object associated with the current navigation state.
 */
export type Location = {
  /**
   * The string value of URL fragment after the # character, or an empty string if no URL fragment is present
   */
  hash: string;
  /**
   * An object of key/value pairs that correspond to the URL request parameters. Only the first value will be returned for parameters that have multiple values. If no parameters are present, this will be an empty object.
   */
  parameter: { [key: string]: string };
  /**
   * An object similar to location.parameter, but with an array of values for each key. If no parameters are present, this will be an empty object.
   */
  parameters: { [key: string]: string[] };
};

/**
 * Event describing the changes in the browser history.
 */
export type HistoryChangeEvent = {
  /**
   * The state object associated with the popped event. This object is identical to the state object that used in the corresponding push() or replace() method that added the popped state to the history stack.
   */
  state: object;
  /**
   * A location object associated with the popped event.
   */
  location: Location;
};

/**
 * Callback function to respond to changes in the browser history.
 */
export type HistoryChangeEventHandler = (e: HistoryChangeEvent) => void;

/**
 * Asynchronous client-side JavaScript API that can interact with the browser history stack. It can only be used in the context of a web app that uses IFRAME. It is not intended for use with sidebars and dialogs in an add-on or container-script context.
 */
export type History = {
  /**
   * Pushes the provided state object, URL parameters and URL fragment onto the browser history stack.
   * @param state An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped. Typically used to store application state information (such as page data) for future retrieval.
   * @param params An object containing URL parameters to associate with this state. For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz". Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz". If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
   * @param hash The string URL fragment appearing after the '#' character. If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
   */
  push(
    state: object,
    params: { [key: string]: string | string[] },
    hash: string
  ): void;
  /**
   * Replaces the top event on the browser history stack with the provided state object, URL parameters and URL fragment.
   * @param state An developer-defined object to be associated with a browser history event, and which resurfaces when the state is popped. Typically used to store application state information (such as page data) for future retrieval.
   * @param params An object containing URL parameters to associate with this state. For example, {foo: “bar”, fiz: “baz”} equates to "?foo=bar&fiz=baz". Alternatively, arrays can be used: {foo: [“bar”, “cat”], fiz: “baz”} equates to "?foo=bar&foo=cat&fiz=baz". If null or undefined, the current URL parameters are not changed. If empty, the URL parameters are cleared.
   * @param hash The string URL fragment appearing after the '#' character. If null or undefined, the current URL fragment is not changed. If empty, the URL fragment is cleared.
   */
  replace(
    state: object,
    params: { [key: string]: string | string[] },
    hash: string
  ): void;
  /**
   * Sets a callback function to respond to changes in the browser history.
   * @param fn a client-side callback function to run upon a history change event, using the event object as the only argument.
   */
  setChangeHandler(fn: HistoryChangeEventHandler | null): void;
};

/**
 * Asynchronous client-side JavaScript API that can interact with dialogs or sidebars in Google Docs, Sheets, or Forms that contain HTML-service pages.
 */
export type Host = {
  /**
   * Provides the host domain, so scripts can set their origin correctly.
   */
  readonly origin: string;
  /**
   * Closes the current dialog or sidebar.
   */
  close(): void;
  /**
   * Sets the height of the current dialog.
   * @param value Value in pixels.
   */
  setHeight(value: number): void;
  /**
   * Sets the width of the current dialog.
   * @param value Value in pixels.
   */
  setWidth(value: number): void;
  /**
   * Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor.
   */
  editor: {
    /**
     * Switches browser focus from the dialog or sidebar to the Google Docs, Sheets, or Forms editor.
     */
    focus(): void;
  };
};

/**
 * Asynchronous client-side JavaScript API that can query URLs to obtain the current URL parameters and fragment. This API supports the google.script.history API. It can only be used in the context of a web app that uses IFRAME. It is not intended for use with sidebars and dialogs in an add-on or container-script context.
 */
export type Url = {
  /**
   * Gets a URL location object and passes it to the specified callback function.
   * @param fn A client-side callback function to run, using the location object as the only argument.
   */
  getLocation(fn: (e: Location) => void): void;
};

/**
 * Callback function to run if the server-side function throws an exception.
 */
export type RunFailureFn = (error: Error, userObject?: object) => void;
/**
 * Callback function to run if the server-side function returns successfully.
 */
export type RunSuccessFn = (result: RpcReturnType, userObject?: object) => void;

export interface Run {
  /**
   * Sets a callback function to run if the server-side function throws an exception. The Error object is passed to the function as the first argument, and the user object (if any) is passed as a second argument. Without a failure handler, failures are logged to the JavaScript console. To override this, call withFailureHandler(null) or supply a failure handler that does nothing.
   * @param fn Failure handler.
   */
  withFailureHandler(fn: RunFailureFn | null): this;
  /**
   * Sets a callback function to run if the server-side function returns successfully. The server's return value is passed to the function as the first argument, and the user object (if any) is passed as a second argument.
   * @param fn Success handler.
   */
  withSuccessHandler(fn: RunSuccessFn): this;
  /**
   * Sets an object to pass as a second parameter to the success and failure handlers. This "user object" — not to be confused with the User class — lets the callback functions respond to the context in which the client contacted the server. Because user objects are not sent to the server, they are not subject to the restrictions on parameters and return values for server calls. User objects cannot, however, be objects constructed with the new operator.
   * @param userObject Object to be passed.
   */
  withUserObject(userObject: object): this;
}

export type ClientRunMethods = {
  [key: string]:
    | ((...params: RpcParamType[]) => void)
    | ((form: HTMLFormElement) => void);
};

export type ClientApi<T extends ClientRunMethods = {}> = {
  script: {
    history: History;
    host: Host;
    url: Url;
    run: Run & T;
  };
};

export type ServerRunMethods = {
  [key: string]:
    | ((...params: RpcParamType[]) => RpcReturnType)
    | ((form: HTMLFormElement) => RpcReturnType);
};

export type RpcValueType = number | boolean | string | null;
export type RpcValueTypeArray = RpcValueType[];
export type RpcValueTypeObject = {
  [key: string]: RpcValueType | RpcValueTypeArray | RpcValueTypeObject;
};

export type RpcParamType =
  | RpcValueType
  | RpcValueTypeArray
  | RpcValueTypeObject;
export type RpcReturnType =
  | RpcValueType
  | RpcValueTypeArray
  | RpcValueTypeObject
  | void;

declare global {
  interface Window {
    google: ClientApi<ClientRunMethods>;
  }
}

import { Application } from "./src/types";

export * from "./src/types";
export * from "./src/app";
export { default } from "./src/app";

/**
 * Install an app in the Google App Script global scope. It creates both the doGet and doPost handler.
 * If a handler already exists, the orgiginal handler is wrapped and executed when the http app returns an error.
 * @param app Http App to be installed.
 */
export function installHttpApp(app: Application): void {
  const globalThis = Function("return this;")();

  const doGet = globalThis.doGet;
  const doPost = globalThis.doPost;

  globalThis.doGet = (e: GoogleAppsScript.Events.DoGet) => {
    try {
      return app(e);
    } catch (error) {
      if (!!doGet) {
        return doGet(e);
      } else throw error;
    }
  };

  globalThis.doPost = (e: GoogleAppsScript.Events.DoPost) => {
    try {
      return app(e);
    } catch (error) {
      if (!!doPost) {
        return doPost(e);
      } else throw error;
    }
  };
}

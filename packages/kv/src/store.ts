import { KVStore, KVStoreValue } from "./type";

/**
 * Creates a Key-Value store out of a Google App Script property store.
 * @param properties Google App Script property store (Script, User or Document).
 * @returns Generic Key-Value store.
 */
export const createPropertiesStore = (
  properties: GoogleAppsScript.Properties.Properties
): KVStore => {
  const store = {
    clear(): void {
      properties.deleteAllProperties();
    },
    delete(key: string): void {
      properties.deleteProperty(key);
    },
    get(key: string): KVStoreValue | undefined {
      const el = properties.getProperty(key);
      return !el ? undefined : JSON.parse(el);
    },
    has(key: string): boolean {
      return properties.getKeys().includes(key);
    },
    set(key: string, value: KVStoreValue): void {
      properties.setProperty(key, JSON.stringify(value));
    },
    entries(): { [key: string]: KVStoreValue } {
      const entries = properties.getProperties();
      return Object.keys(entries).reduce((result, key) => {
        result[key] = JSON.parse(entries[key]);
        return result;
      }, {} as { [key: string]: KVStoreValue });
    },
  };

  return store;
};

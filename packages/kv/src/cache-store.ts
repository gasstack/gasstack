import { KVStore, KVStoreValue } from "./type";

/**
 * Creates a Key-Value store out of a Google App Script cache store.
 * @param cache Google App Script cache (Script, User or Document).
 * @param expiration Time to live in seconds of the entries.
 * @returns Generic Key-Value store.
 */
export const createCacheStore = (
  cache: GoogleAppsScript.Cache.Cache,
  expiration?: number
): KVStore => {
  const keys: string[] = [];
  const store = {
    clear(): void {
      cache.removeAll(keys);
      keys.splice(0, keys.length);
    },
    delete(key: string): void {
      const idx = keys.indexOf(key);
      if (idx >= 0) {
        cache.remove(key);
        keys.splice(idx, 1);
      }
    },
    get(key: string): KVStoreValue | undefined {
      const el = cache.get(key);
      return !el ? undefined : JSON.parse(el);
    },
    has(key: string): boolean {
      return keys.includes(key);
    },
    set(key: string, value: KVStoreValue): void {
      if (expiration !== undefined)
        cache.put(key, JSON.stringify(value), expiration);
      else cache.put(key, JSON.stringify(value));

      if (!keys.includes(key)) keys.push(key);
    },
    entries(): { [key: string]: KVStoreValue } {
      const entries = cache.getAll(keys);
      return Object.keys(entries).reduce((result, key) => {
        result[key] = JSON.parse(entries[key]);
        return result;
      }, {} as { [key: string]: KVStoreValue });
    },
  };

  return store;
};

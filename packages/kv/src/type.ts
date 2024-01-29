export type KVStoreValue = string | number | Date | boolean | object;

export type KVStore = {
  clear(): void;
  delete(key: string): void;
  get(key: string): KVStoreValue | undefined;
  has(key: string): boolean;
  set(key: string, value: KVStoreValue): void;
  entries(): { [key: string]: KVStoreValue };
};

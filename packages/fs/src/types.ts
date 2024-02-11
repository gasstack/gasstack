export type DriveItem =
  | GoogleAppsScript.Drive.File
  | GoogleAppsScript.Drive.Folder;

export type DriveItemIterator<T extends DriveItem> = {
  getContinuationToken(): string;
  hasNext(): boolean;
  next(): T;
};

export type ImageBase64 = `data:image/${string};base64,${string}`;

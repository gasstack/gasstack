import { DriveItem, DriveItemIterator } from "./types";

export function fromDriveIterator<T extends DriveItem>(
  iterator: DriveItemIterator<T>,
  limit?: number
): T[] {
  const items: T[] = [];
  while (iterator.hasNext() && (limit === undefined || limit-- > 0))
    items.push(iterator.next());

  return items;
}

export function getFolders(folderId?: string) {
  const currentFolder = !folderId
    ? DriveApp.getRootFolder()
    : DriveApp.getFolderById(folderId);
  const iterator = currentFolder.getFolders();
  return fromDriveIterator(iterator);
}

export function continueFolders(continuationToken: string, limit?: number) {
  const iterator = DriveApp.continueFolderIterator(continuationToken);
  return fromDriveIterator(iterator, limit);
}

export function getFiles(folderId?: string) {
  const currentFolder = !folderId
    ? DriveApp.getRootFolder()
    : DriveApp.getFolderById(folderId);
  const iterator = currentFolder.getFiles();
  return fromDriveIterator(iterator);
}

export function continueFiles(continuationToken: string, limit?: number) {
  const iterator = DriveApp.continueFileIterator(continuationToken);
  return fromDriveIterator(iterator, limit);
}

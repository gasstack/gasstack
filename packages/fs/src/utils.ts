import { DriveItem, DriveItemIterator } from "./types";

/**
 * Produces an array out of a DriveApp iterator (Files or Folders).
 * @param iterator DriveApp iterator.
 * @param limit Number of item to read.
 * @returns Array of items.
 */
export function fromDriveIterator<T extends DriveItem>(
  iterator: DriveItemIterator<T>,
  limit?: number
): T[] {
  const items: T[] = [];
  while (iterator.hasNext() && (limit === undefined || limit-- > 0))
    items.push(iterator.next());

  return items;
}

/**
 * Gets an array of folders from a given folder.
 * @param folderId Id of the folder to read.
 * @returns Array of Folders.
 */
export function getFolders(folderId?: string) {
  const currentFolder = !folderId
    ? DriveApp.getRootFolder()
    : DriveApp.getFolderById(folderId);
  const iterator = currentFolder.getFolders();
  return fromDriveIterator(iterator);
}

/**
 * Continues a pagination read based on a continuation token.
 * @param continuationToken Token of the previous iterator.
 * @param limit Number of item to read.
 * @returns Array of Folders.
 */
export function continueFolders(continuationToken: string, limit?: number) {
  const iterator = DriveApp.continueFolderIterator(continuationToken);
  return fromDriveIterator(iterator, limit);
}

/**
 * Gets an array of files from a given folder.
 * @param folderId Id of the folder to read.
 * @returns Array of Files.
 */
export function getFiles(folderId?: string) {
  const currentFolder = !folderId
    ? DriveApp.getRootFolder()
    : DriveApp.getFolderById(folderId);
  const iterator = currentFolder.getFiles();
  return fromDriveIterator(iterator);
}

/**
 * Continues a pagination read based on a continuation token.
 * @param continuationToken Token of the previous iterator.
 * @param limit Number of item to read.
 * @returns Array of Files.
 */
export function continueFiles(continuationToken: string, limit?: number) {
  const iterator = DriveApp.continueFileIterator(continuationToken);
  return fromDriveIterator(iterator, limit);
}

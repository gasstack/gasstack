import { DriveItem, DriveItemIterator, ImageBase64 } from "./types";

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

/**
 * Return a base64 html data string of an image stored in google Drive.
 * @param fileId Id of the Drive file.
 * @returns Base64 html data string.
 */
export function getImageBase64(fileId: string): ImageBase64 {
  const file = DriveApp.getFileById(fileId);
  const mime = file.getMimeType();
  if (mime.startsWith("image/") == false)
    throw new Error(
      `FileId: ${fileId} is not a valid image file. Its type is: ${mime}`
    );

  const data = file.getBlob().getBytes();
  return `data:${mime};base64,${Utilities.base64Encode(data)}` as ImageBase64;
}

export type UrlString = `https://${string}`;
export type EmailString = `${string}@${string}.${string}`;
export type MimeString = `${string}/${string}`;
export type ImageBase64 = `data:image/${string};base64,${string}`;

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

export function fnName(fn: (...args: any[]) => any) {
  if (!fn) throw new Error("Null functions not allowed");
  if (fn.name === "") throw new Error("Anonymous functions not allowed");

  return fn.name;
}

export function ifDef<T>(
  value: T,
  fn: (value: T) => void,
  elseFn?: () => void
) {
  if (value !== undefined) fn(value);
  else if (elseFn !== undefined) elseFn();
}

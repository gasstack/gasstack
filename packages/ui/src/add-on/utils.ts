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

//TODO: bhf template string function
// Format	Example	Rendered result
// Bold	"This is <b>bold</b>."	This is bold.
// Italics	"This is <i>italics</i>."	This is italics.
// Underline	"This is <u>underline</u>."	This is underline.
// Strikethrough	"This is <s>strikethrough</s>."	This is strikethrough.
// Font color	"This is <font color=\"#FF0000\">red font</font>."	This is red font.
// Hyperlink	"This is a <a href=\"https://www.google.com\">hyperlink</a>."	This is a hyperlink.
// Time	"This is a time format: <time>2023-02-16 15:00</time>."	This is a time format: 2023-02-16 15:00.
// Newline	"This is the first line. <br> This is a new line."	This is the first line.
// This is a new line.

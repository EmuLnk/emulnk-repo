/**
 * Decode a base64 string into a Uint8Array.
 */
export function decodeBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

/**
 * Decode a base64 string into a DataView for binary data parsing.
 */
export function decodeBase64ToDataView(b64: string): DataView {
  return new DataView(decodeBase64(b64).buffer);
}

/**
 * Decode a base64 string into a UTF-8 string.
 */
export function decodeBase64ToText(b64: string): string {
  return new TextDecoder("utf-8").decode(decodeBase64(b64));
}

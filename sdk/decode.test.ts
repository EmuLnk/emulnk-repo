import { describe, it, expect } from "vitest";
import { decodeBase64, decodeBase64ToDataView, decodeBase64ToText } from "./decode.js";

describe("decodeBase64", () => {
  it("decodes to correct bytes", () => {
    const result = decodeBase64(btoa("hello"));
    expect(result).toBeInstanceOf(Uint8Array);
    expect(Array.from(result)).toEqual([104, 101, 108, 108, 111]);
  });

  it("handles empty string", () => {
    const result = decodeBase64(btoa(""));
    expect(result.length).toBe(0);
  });
});

describe("decodeBase64ToDataView", () => {
  it("returns DataView with correct byte values", () => {
    const dv = decodeBase64ToDataView(btoa("\x01\x02\x03"));
    expect(dv).toBeInstanceOf(DataView);
    expect(dv.getUint8(0)).toBe(1);
    expect(dv.getUint8(1)).toBe(2);
    expect(dv.getUint8(2)).toBe(3);
  });
});

describe("decodeBase64ToText", () => {
  it("decodes UTF-8 text", () => {
    expect(decodeBase64ToText(btoa("hello"))).toBe("hello");
  });

  it("handles empty string", () => {
    expect(decodeBase64ToText(btoa(""))).toBe("");
  });
});

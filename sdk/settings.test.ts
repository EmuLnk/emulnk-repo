import { describe, it, expect } from "vitest";
import { bool, num, str } from "./settings.js";

describe("bool", () => {
  it("returns true for 'true'", () => expect(bool({ k: "true" }, "k")).toBe(true));
  it("returns true for '1'", () => expect(bool({ k: "1" }, "k")).toBe(true));
  it("returns true for 'yes'", () => expect(bool({ k: "yes" }, "k")).toBe(true));
  it("returns false for 'false'", () => expect(bool({ k: "false" }, "k")).toBe(false));
  it("returns false for '0'", () => expect(bool({ k: "0" }, "k")).toBe(false));
  it("returns false for 'no'", () => expect(bool({ k: "no" }, "k")).toBe(false));
  it("returns fallback for missing key", () => expect(bool({}, "k")).toBe(false));
  it("returns custom fallback", () => expect(bool({}, "k", true)).toBe(true));
  it("is case-insensitive", () => expect(bool({ k: "TRUE" }, "k")).toBe(true));
});

describe("num", () => {
  it("parses integer", () => expect(num({ k: "42" }, "k")).toBe(42));
  it("parses float", () => expect(num({ k: "3.14" }, "k")).toBe(3.14));
  it("returns fallback for NaN", () => expect(num({ k: "abc" }, "k", 10)).toBe(10));
  it("returns fallback for missing key", () => expect(num({}, "k", 5)).toBe(5));
  it("default fallback is 0", () => expect(num({}, "k")).toBe(0));
});

describe("str", () => {
  it("returns the value", () => expect(str({ k: "hello" }, "k")).toBe("hello"));
  it("returns fallback for missing key", () => expect(str({}, "k", "x")).toBe("x"));
  it("default fallback is empty string", () => expect(str({}, "k")).toBe(""));
});

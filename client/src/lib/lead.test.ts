import { describe, expect, it } from "vitest";
import { COOLDOWN_MS, formatBelarusPhone, leadSchema } from "./lead";

const valid = { name: "Анна", phone: "+375 29 123-45-67", interest: "Разовый заказ", comment: "" };
describe("lead validation", () => {
  it("blocks repeat submissions for exactly ten minutes", () => {
    expect(COOLDOWN_MS).toBe(600000);
  });
  it.each(["29", "33", "44", "25"])("accepts Belarus operator %s", (code) => {
    expect(leadSchema.safeParse({ ...valid, phone: `+375 ${code} 123-45-67` }).success).toBe(true);
  });
  it.each(["+375 17 123-45-67", "+7 29 123-45-67", "+375 29 123-45-6", "+375 29 123-45-678"])("rejects invalid phone %s", (phone) => {
    expect(leadSchema.safeParse({ ...valid, phone }).success).toBe(false);
  });
  it("rejects short names, excessive comments, attribution and unknown fields", () => {
    for (const change of [{ name: " А " }, { comment: "a".repeat(1001) }, { utmSource: "a".repeat(201) }, { admin: true }]) {
      expect(leadSchema.safeParse({ ...valid, ...change }).success).toBe(false);
    }
  });
  it("masks pasted and partial phone numbers", () => {
    expect(formatBelarusPhone("+375291234567")).toBe("+375 29 123-45-67");
    expect(formatBelarusPhone("291234567")).toBe("+375 29 123-45-67");
    expect(formatBelarusPhone("+375 29 123-4")).toBe("+375 29 123-4");
  });
});
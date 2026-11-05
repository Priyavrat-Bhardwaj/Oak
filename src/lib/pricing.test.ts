import { describe, expect, it } from "vitest";
import { formatPrice } from "./products";

describe("pricing", () => {
  it("shows amounts in Indian rupees with lakh grouping", () => {
    expect(formatPrice(64999)).toBe("₹64,999");
    expect(formatPrice(28999)).toBe("₹28,999");
    expect(formatPrice(125000)).toBe("₹1,25,000");
  });
});

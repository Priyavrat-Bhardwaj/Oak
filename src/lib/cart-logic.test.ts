import { describe, expect, it } from "vitest";
import { addLine, setQty, shipping, subtotal, type CartLine } from "./cart-logic";

const line = (over: Partial<CartLine> = {}): CartLine => ({
  key: "a::oak", slug: "a", name: "A", material: "oak", unitPrice: 500, image: "", qty: 1, ...over,
});

describe("cart", () => {
  it("merges the same product+material", () => {
    expect(addLine([line()], line({ qty: 2 }))[0]?.qty).toBe(3);
  });
  it("caps quantity at 10", () => {
    expect(setQty([line()], "a::oak", 25)[0]?.qty).toBe(10);
  });
  it("removes a line at zero", () => {
    expect(setQty([line()], "a::oak", 0)).toHaveLength(0);
  });
  it("sums subtotal", () => {
    expect(subtotal([line({ qty: 2 }), line({ key: "b", unitPrice: 300 })])).toBe(1300);
  });
  it("charges ₹999 shipping under ₹25,000, free at or above", () => {
    expect(shipping([line()])).toBe(999);
    expect(shipping([line({ unitPrice: 25000 })])).toBe(0);
  });
});

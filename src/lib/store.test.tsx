import { act } from "react";
import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StoreProvider, useStore } from "./store";

describe("store", () => {
  it("gives consumers under the provider a working cart", () => {
    const { result } = renderHook(() => useStore(), { wrapper: StoreProvider });
    act(() => {
      result.current.add({
        key: "moss-ottoman::Olive Velvet", slug: "moss-ottoman", name: "Moss Ottoman",
        material: "Olive Velvet", unitPrice: 45000, image: "", qty: 1,
      });
    });
    expect(result.current.count).toBe(1);
    expect(result.current.lines[0]?.unitPrice).toBe(45000);
    expect(result.current.drawerOpen).toBe(true);
  });

  it("renders an empty cart instead of crashing when no provider is mounted", () => {
    const { result } = renderHook(() => useStore());
    expect(result.current.count).toBe(0);
    expect(result.current.lines).toEqual([]);
    expect(result.current.drawerOpen).toBe(false);
  });
});

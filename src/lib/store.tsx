import { createContext, useCallback, useContext, useEffect, useMemo, useState, type Context, type ReactNode } from "react";
import { toast } from "sonner";
import { addLine, itemCount, setQty, type CartLine } from "./cart-logic";
import { reportLovableError } from "./lovable-error-reporting";

type Store = {
  lines: CartLine[];
  count: number;
  add: (line: CartLine) => void;
  update: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  drawerOpen: boolean;
  setDrawerOpen: (v: boolean) => void;
  bump: number;
  wishlist: string[];
  toggleWish: (slug: string, name: string) => void;
};

// Vite re-executes this module on hot update. Reusing the context object stored on
// import.meta.hot keeps already-mounted consumers reading the same context the
// provider publishes, instead of a brand-new empty one.
const Ctx: Context<Store | null> =
  (import.meta.hot?.data?.oakStoreCtx as Context<Store | null> | undefined) ??
  createContext<Store | null>(null);
if (import.meta.hot?.data) import.meta.hot.data.oakStoreCtx = Ctx;

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [bump, setBump] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setLines(JSON.parse(localStorage.getItem("oak-cart") || "[]"));
      setWishlist(JSON.parse(localStorage.getItem("oak-wish") || "[]"));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => { if (loaded) localStorage.setItem("oak-cart", JSON.stringify(lines)); }, [lines, loaded]);
  useEffect(() => { if (loaded) localStorage.setItem("oak-wish", JSON.stringify(wishlist)); }, [wishlist, loaded]);

  const add = useCallback((line: CartLine) => {
    setLines((l) => addLine(l, line));
    setBump((b) => b + 1);
    setDrawerOpen(true);
    toast.success(`${line.name} added`, { description: `${line.material} · Qty ${line.qty}` });
  }, []);

  const toggleWish = useCallback((slug: string, name: string) => {
    setWishlist((w) => {
      const has = w.includes(slug);
      toast(has ? `Removed ${name} from wishlist` : `Saved ${name} to wishlist`);
      return has ? w.filter((s) => s !== slug) : [...w, slug];
    });
  }, []);

  const value = useMemo<Store>(() => ({
    lines,
    count: itemCount(lines),
    add,
    update: (key, qty) => setLines((l) => setQty(l, key, qty)),
    remove: (key) => setLines((l) => l.filter((x) => x.key !== key)),
    clear: () => setLines([]),
    drawerOpen, setDrawerOpen, bump, wishlist, toggleWish,
  }), [lines, add, drawerOpen, bump, wishlist, toggleWish]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

// Rendering an empty cart beats blanking the whole page if a consumer ever ends up
// above the provider (e.g. a component moved outside <StoreProvider>).
const INERT: Store = {
  lines: [],
  count: 0,
  add: () => {},
  update: () => {},
  remove: () => {},
  clear: () => {},
  drawerOpen: false,
  setDrawerOpen: () => {},
  bump: 0,
  wishlist: [],
  toggleWish: () => {},
};

let missingProviderReported = false;

export function useStore(): Store {
  const c = useContext(Ctx);
  if (!c) {
    if (!missingProviderReported) {
      missingProviderReported = true;
      reportLovableError(new Error("useStore outside provider"), { boundary: "store_fallback" });
    }
    return INERT;
  }
  return c;
}

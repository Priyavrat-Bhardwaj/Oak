import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo } from "react";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/products";
import { ProductCard } from "@/components/oak/ProductCard";

type Sort = "featured" | "price-asc" | "price-desc" | "name";
type ShopSearch = { category?: Category | undefined; q?: string | undefined; sort?: Sort | undefined };

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): ShopSearch => ({
    category: CATEGORIES.includes(s["category"] as Category) ? (s["category"] as Category) : undefined,
    q: typeof s["q"] === "string" && s["q"] ? s["q"] : undefined,
    sort: ["featured", "price-asc", "price-desc", "name"].includes(s["sort"] as string) ? (s["sort"] as Sort) : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Shop furniture — OAK" },
      { name: "description", content: "Browse OAK seating, tables, storage and lighting. Filter, search and sort the full collection." },
      { property: "og:title", content: "Shop furniture — OAK" },
      { property: "og:description", content: "Browse OAK seating, tables, storage and lighting." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { category, q = "", sort = "featured" } = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });
  const set = (patch: Partial<ShopSearch>) => navigate({ search: (s) => ({ ...s, ...patch }), replace: true });

  const results = useMemo(() => {
    let r = PRODUCTS.filter((p) => (!category || p.category === category) &&
      (!q || `${p.name} ${p.tagline} ${p.category}`.toLowerCase().includes(q.toLowerCase())));
    if (sort === "price-asc") r = [...r].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") r = [...r].sort((a, b) => b.price - a.price);
    if (sort === "name") r = [...r].sort((a, b) => a.name.localeCompare(b.name));
    return r;
  }, [category, q, sort]);

  // Common fate: changing key re-mounts the grid so all cards animate together
  const gridKey = `${category}-${q}-${sort}`;

  return (
    <div className="mx-auto max-w-7xl px-6 pt-36">
      <p className="eyebrow text-olive">The collection</p>
      <h1 className="mt-3 text-6xl md:text-7xl">Shop</h1>

      {/* Common region: all filtering controls share one container */}
      <section aria-label="Filters" className="region mt-10 flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Category">
          <button className="chip" data-active={!category} onClick={() => set({ category: undefined })}>All</button>
          {CATEGORIES.map((c) => (
            <button key={c} className="chip" data-active={category === c} onClick={() => set({ category: c })}>{c}</button>
          ))}
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <label className="relative">
            <span className="sr-only">Search products</span>
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input value={q} onChange={(e) => set({ q: e.target.value || undefined })} placeholder="Search"
              className="h-10 w-full rounded-full border border-border bg-background pl-9 pr-4 text-sm sm:w-56" />
          </label>
          <label>
            <span className="sr-only">Sort</span>
            <select value={sort} onChange={(e) => set({ sort: e.target.value as Sort })}
              className="h-10 w-full rounded-full border border-border bg-background px-4 text-sm">
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="name">Name A–Z</option>
            </select>
          </label>
        </div>
      </section>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{results.length} {results.length === 1 ? "piece" : "pieces"}</p>

      {results.length === 0 ? (
        <div className="region mt-6 p-16 text-center">
          <p className="font-display text-3xl">No pieces match that search.</p>
          <button className="btn btn-primary mt-6" onClick={() => navigate({ search: {} })}>Clear filters</button>
        </div>
      ) : (
        <div key={gridKey} className="mt-6 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
        </div>
      )}
    </div>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronLeft, Heart } from "lucide-react";
import { useState } from "react";
import { formatPrice, getProduct, PRODUCTS } from "@/lib/products";
import { useStore } from "@/lib/store";
import { FREE_SHIPPING_THRESHOLD, lineKey } from "@/lib/cart-logic";
import { QtyControl } from "@/components/oak/QtyControl";
import { ProductCard } from "@/components/oak/ProductCard";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, description: p.description };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — OAK` },
          { name: "description", content: loaderData.description },
          { property: "og:title", content: `${loaderData.name} — OAK` },
          { property: "og:description", content: loaderData.description },
        ]
      : [{ title: "Piece not found — OAK" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-6 pt-48 text-center">
      <h1 className="text-5xl">This piece isn’t in the collection.</h1>
      <Link to="/shop" className="btn btn-primary mt-8">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add, wishlist, toggleWish } = useStore();
  const [img, setImg] = useState(0);
  const [mat, setMat] = useState(0);
  const [qty, setQty] = useState(1);
  const material = p.materials[mat] ?? p.materials[0]!;
  const unit = p.price + material.surcharge;
  const wished = wishlist.includes(p.slug);
  const related = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32">
      <Link to="/shop" className="eyebrow inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"><ChevronLeft size={14} /> Shop</Link>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col-reverse gap-4 md:flex-row">
          <div className="flex gap-3 md:flex-col">
            {p.images.map((src, i) => (
              <button key={i} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} aria-current={img === i}
                className={`h-24 w-20 overflow-hidden rounded-lg border-2 transition ${img === i ? "border-foreground" : "border-transparent opacity-60 hover:opacity-100"}`}>
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
          <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-card">
            <img key={img} src={p.images[img]} alt={p.name} className="animate-reveal absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow text-olive">{p.category}</p>
          <h1 className="mt-3 text-5xl md:text-6xl">{p.name}</h1>
          <p className="mt-3 text-2xl tabular-nums">{formatPrice(unit)}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{p.description}</p>

          {/* Common region: configuration grouped in one panel */}
          <div className="region mt-8 space-y-6 p-6">
            <fieldset>
              <legend className="eyebrow">Material — <span className="normal-case tracking-normal font-normal">{material.name}</span></legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.materials.map((m, i) => (
                  <button key={m.name} onClick={() => setMat(i)} className="chip flex items-center gap-2" data-active={mat === i} aria-pressed={mat === i}>
                    <span className="h-4 w-4 rounded-full border border-border" style={{ background: m.swatch }} />
                    {m.name}{m.surcharge ? ` +${formatPrice(m.surcharge)}` : ""}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-wrap items-center gap-3">
              <QtyControl value={qty} onChange={setQty} min={1} />
              <button className="btn btn-primary flex-1"
                onClick={() => add({ key: lineKey(p.slug, material.name), slug: p.slug, name: p.name, material: material.name, unitPrice: unit, image: p.images[0] ?? "", qty })}>
                Add to cart — {formatPrice(unit * qty)}
              </button>
              <button onClick={() => toggleWish(p.slug, p.name)} aria-pressed={wished} aria-label="Toggle wishlist"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border hover:border-foreground">
                <Heart key={String(wished)} size={17} className={wished ? "animate-pop fill-accent text-accent" : ""} />
              </button>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div><dt className="eyebrow text-muted-foreground">Dimensions</dt><dd className="mt-1">{p.dimensions}</dd></div>
            <div><dt className="eyebrow text-muted-foreground">Delivery</dt><dd className="mt-1">Free over {formatPrice(FREE_SHIPPING_THRESHOLD)}</dd></div>
          </dl>
        </div>
      </div>

      <section className="mt-28">
        <h2 className="text-4xl">You may also like</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r, i) => <ProductCard key={r.slug} product={r} index={i} />)}
        </div>
      </section>
    </div>
  );
}
